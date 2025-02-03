import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { UserChangesFields } from "src/common/db/schemas/fields";

export enum FileStatusEnum{
    ACTIVE="ACTIVE",
    DELETED="DELETED",
}

@Schema({ timestamps: true })
export class File {
    @Prop({ required: true})
    originalName: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    description?: string;

    @Prop({ required: true })
    mimeType: string;

    @Prop({ required: true, default: FileStatusEnum.ACTIVE })
    status?: FileStatusEnum;

    @Prop({ required: true, ref: "userChanges" })
    userChanges: UserChangesFields
}

export const FileSchema = SchemaFactory.createForClass(File).index({ name: 1 }, { unique: true });