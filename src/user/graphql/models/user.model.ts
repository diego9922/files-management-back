import { ArgsType, Field, ObjectType, ID, GraphQLISODateTime } from "@nestjs/graphql";
import UserInterface from "src/user/user.interface";

@ObjectType()
export class User implements Omit<UserInterface, "password"> {
    @Field(type => ID)
    _id: string;

    @Field(type => String)
    email: string;

    @Field(type => GraphQLISODateTime)
    createdAt: string;

    @Field(type => GraphQLISODateTime)
    updatedAt: string;
}

@ArgsType()
export class UserArgs implements UserInterface {
    @Field(type => String)
    email: string;

    @Field(type => String)
    password: string;
}