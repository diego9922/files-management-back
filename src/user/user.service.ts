import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserDB } from './db/schemas/user.schema';
import { UserArgs } from './graphql/models/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserDB.name) private userModel:Model<UserDB> ){}

    async create(user:UserArgs): Promise<UserDB>
    {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    findAll(): Promise<UserDB[]>
    {
        return this.userModel.find();
    }

    findByEmail(email:string): Promise<UserDB>
    {
        return this.userModel.findOne({ email });
    }
}
