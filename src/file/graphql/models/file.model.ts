import { Field, ObjectType, registerEnumType, InputType, InterfaceType, ID } from '@nestjs/graphql';
import { FileStatusEnum } from 'src/file/db/schemas/file.schema';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

registerEnumType(FileStatusEnum, {
    name: 'FileStatusEnum',
    description: 'Valid status for file'
});


@ObjectType()
export class File {
    @Field(type => ID)
    _id: string;

    @Field(type => String)
    originalName: string;

    @Field(type =>String)
    name: string;

    @Field(type => String, { nullable: true })
    description?: string;

    @Field(type => String)
    mimeType: string;

    @Field(type => FileStatusEnum)
    status: FileStatusEnum
}

@InputType()
export class FileInput {
    @Field(type => String, { nullable: true })
    description?: string;

    @Field(() => GraphQLUpload, { nullable: false })
    file: FileUpload
}