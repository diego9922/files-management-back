import { Field, ObjectType, ID, ArgsType, InputType, GraphQLISODateTime } from '@nestjs/graphql';
import { isAbstractType } from 'graphql';

export interface FolderInterface {
    name: string;
    description?: string;
    parentFolder?: string;
}

// type FolderOptionalFields = Partial<FolderInterface>;

@ArgsType()
export class FolderArgs implements FolderInterface {
    // This class is for mutation register data
    
    @Field(type => String)
    name: string;

    @Field(type => String, { nullable: true })
    description?: string;

    @Field(type => String, { nullable: true })
    parentFolder?: string;

}

@InputType()
export class FolderInput implements Omit<FolderInterface, 'name'> {
    // This class is for mutation update data

    @Field(type => String, { nullable: true })
    name?: string;

    @Field(type => String, { nullable: true })
    description?: string;

    @Field(type => String, { nullable: true })
    parentFolder?: string;
}

@ObjectType()
export class FolderObject implements FolderInterface {
    // This class is for querys

    @Field(type => ID)
    _id: string;

    @Field(type => String)
    name: string;

    @Field(type => String, { nullable: true })
    description?: string;

    @Field(type => String, { nullable: true })
    parentFolder?: string;

    //@todo, some fields could move to a 'common' module using @ObjectType({ isAbstract: true }) (evaluate this)
    @Field(type => String)
    owner: string;

    @Field(type => String)
    createdBy: string;

    @Field(type => String)
    updatedBy: string;

    @Field(type => GraphQLISODateTime)
    createdAt: string;

    @Field(type => GraphQLISODateTime)
    updatedAt: string;
}
