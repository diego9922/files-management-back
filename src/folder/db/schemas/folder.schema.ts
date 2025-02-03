import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserChangesFields } from "src/common/db/schemas/fields";

@Schema({ timestamps: true })
export class Folder {
    @Prop({ required: true })
    name: string;

    //recursive relation
    @Prop({ ref: "Folder" })
    parentFolder?: mongoose.Schema.Types.ObjectId;

    @Prop()
    description?: string;

    @Prop({ required: true, ref: "userChanges" })
    userChanges: UserChangesFields;
}

export class FoundFolder {
    _id: string;
    __v: number;
}

export const FolderSchema = SchemaFactory.createForClass(Folder).index({ name: 1, parentFolder: 1 }, { unique: true });//@todo, use middelware for incremente __v
