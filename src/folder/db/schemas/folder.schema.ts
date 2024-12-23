import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Folder {
    @Prop({ required: true })
    name: string;

    //recursive relation
    @Prop({ ref: "Folder" })
    parentFolder?: mongoose.Schema.Types.ObjectId

    @Prop()
    description?: string
}

export class FoundFolder {
    _id: string;
    __v: number;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);
