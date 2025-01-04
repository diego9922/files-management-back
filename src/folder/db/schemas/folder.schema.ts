import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/user/db/schemas/user.schema";

@Schema({ timestamps: true })
export class Folder {
    @Prop({ required: true })
    name: string;

    //recursive relation
    @Prop({ ref: "Folder" })
    parentFolder?: mongoose.Schema.Types.ObjectId;

    @Prop()
    description?: string;

    @Prop({ required: true, ref: User.name })
    owner: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, ref: User.name })
    createdBy: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, ref: User.name })
    updatedBy: mongoose.Schema.Types.ObjectId;
}

export class FoundFolder {
    _id: string;
    __v: number;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);//@todo, use middelware for incremente __v
