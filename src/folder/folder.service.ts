import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder as FolderDB } from './db/schemas/folder.schema';
import { Folder, FolderArgs } from './graphql/models/folder.schema';

@Injectable()
export class FolderService {
    constructor(
        @InjectModel(FolderDB.name) private folderModel: Model<FolderDB>
    ){}

    async create(folder:FolderArgs): Promise<FolderDB>
    {
        const newFolder = new this.folderModel(folder);
        return newFolder.save();
    }

    findAll(): Promise<FolderDB[]>
    {
        return this.folderModel.find();
    }

    findById(id:string): Promise<FolderDB>
    {
        return this.folderModel.findById(id);
    }
}
