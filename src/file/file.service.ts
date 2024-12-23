import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { File } from './db/schemas/file.schema';
import { FileInput } from './graphql/models/file.model';
import { StorageService } from './storage/storage.service';

@Injectable()
export class FileService {
    constructor(
        @InjectModel(File.name) private fileModel: Model<File>,
        private storageService:StorageService
    ){}

    async create(file:FileInput): Promise<File>
    {
        const upload = await this.storageService.upload(file.file);
        const fileSchema:File = {
            ...upload,
            description: file.description
        };

        const newFile = new this.fileModel(fileSchema);
        return newFile.save();
    }

    async update(id:string, file:FileInput): Promise<File>
    {
        const currentFile = await this.findById(id);
        const upload = await this.storageService.upload(file.file);
        const fileSchema:File = {
            ...upload,
            description: file.description
        };
        const updated = await this.fileModel.findByIdAndUpdate(id, fileSchema, { new: true }); 
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
