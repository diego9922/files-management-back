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

    findAll(): Promise<File[]>
    {
        return this.fileModel.find(); 
    }

    findById(id:string): Promise<File>
    {
        return this.fileModel.findById(id);
    }
}
