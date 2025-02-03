import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './db/schemas/file.schema';
import { FileInput } from './graphql/models/file.model';
import { StorageService } from './storage/storage.service';
import { UserFound } from 'src/user/db/schemas/user.schema';
import { ObjectId } from 'mongoose';

@Injectable()
export class FileService {
    constructor(
        @InjectModel(File.name) private fileModel: Model<File>,
        private storageService:StorageService
    ){}

    async create(user:UserFound, file:FileInput): Promise<File>
    {
        const upload = await this.storageService.upload(file.file);

        const newFile = new this.fileModel({
            ...upload,
            description: file.description,
            userChanges: {
                owner: user._id,
                createdBy: user._id,
                updatedBy: user._id,
            }
        });
        return newFile.save();
    }

    async update(user:UserFound, id:string, file:FileInput): Promise<File>
    {
        const currentFile = await this.findById(id);
        const upload = await this.storageService.upload(file.file);
        const updated = await this.fileModel.findByIdAndUpdate(
            id,
            {
                ...upload,
                description: file.description,
                "userChanges.updatedBy": user._id,
            },
            { new: true }
        ); 
        this.storageService.delete(currentFile.name);
        return updated;
    }

    findAll(): Promise<File[]>
    {
        return this.fileModel.find(); 
    }

    findById(id:string): Promise<File>
    {
        return this.fileModel.findById(id);
    }
}
