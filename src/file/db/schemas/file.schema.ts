import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export enum FileStatusEnum{
    ACTIVE="ACTIVE",
    DELETED="DELETED",
}

@Schema()
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
    status?: FileStatusEnum
}

export const FileSchema = SchemaFactory.createForClass(File).index({ name: 1 }, { unique: true });