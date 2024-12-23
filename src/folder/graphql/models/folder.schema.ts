import { Field, ObjectType, ID, ArgsType } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-ts';

@ObjectType()
export class Folder {
    @Field(type => ID)
    _id: string;

    @Field(type =>String)
    name: string;

    @Field(type => String)
    description?: string;

    @Field(type => String, { nullable: true })
    parentFolder?: string;
}

@ArgsType()
export class FolderArgs {
    @Field(type => String)
    name: string;

    @Field(type => String, { nullable: true })
    description?: string;

    @Field(type => String, { nullable: true })
    parentFolder?: string;
}