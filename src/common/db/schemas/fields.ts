import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/db/schemas/user.schema";

export interface UserChangesFieldsInterface {
    owner: mongoose.Schema.Types.ObjectId | string;
    createdBy: mongoose.Schema.Types.ObjectId | string;
    updatedBy: mongoose.Schema.Types.ObjectId | string;
}

export class UserChangesFields implements UserChangesFieldsInterface {
    @Prop({ required: true, ref: User.name })
    owner: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, ref: User.name })
    createdBy: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, ref: User.name })
    updatedBy: mongoose.Schema.Types.ObjectId;
}