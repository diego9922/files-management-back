import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserDB, UserFound } from './db/schemas/user.schema';
import { UserArgs } from './graphql/models/user.model';
import { FolderService } from 'src/folder/folder.service';
import { FolderInput } from 'src/folder/graphql/models/folder.model';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserDB.name) private userModel:Model<UserDB>,
        private folderService:FolderService
    ){}

    async create(user:UserArgs): Promise<UserDB>
    {
        const newUser = new this.userModel(user);
        const userConvert:UserFound = {
            ...newUser,
            __v: newUser.__v,
            _id: newUser._id.toString()
        };
        this.folderService.create(
            userConvert,
            {
                name: userConvert._id,
                description: `Root folder of ${userConvert.email}`,
            }
        );
        return newUser.save();
    }

    findAll(): Promise<UserDB[]>
    {
        return this.userModel.find();
    }

    findByEmail(email:string): Promise<UserFound>
    {
        return this.userModel.findOne({ email });
    }

    findById(id:string): Promise<UserFound>
    {
        return this.userModel.findById(id);
    }
}
