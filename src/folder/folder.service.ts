import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder as FolderDB } from './db/schemas/folder.schema';
import { FolderObject, FolderArgs, FolderInput } from './graphql/models/folder.model';
import { UserFound } from 'src/user/db/schemas/user.schema';

@Injectable()
export class FolderService {
    constructor(
        @InjectModel(FolderDB.name) private folderModel: Model<FolderDB>
    ){}

    async create(user:UserFound, folder:FolderArgs): Promise<FolderDB>
    {
        const newFolder = new this.folderModel({
            ...folder, 
            userChanges: {
                owner: user._id,
                createdBy: user._id,
                updatedBy: user._id
            }
        });
        return newFolder.save();
    }

    async update(user:UserFound, id:string, folder:FolderInput): Promise<FolderDB>
    {
        const updated = this.folderModel.findByIdAndUpdate(
            id, 
            {
                ...folder,
                "userChanges.updatedBy": user._id,
                $inc: {__v: 1}
            },
            { new: true }
        );
        return updated;
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
