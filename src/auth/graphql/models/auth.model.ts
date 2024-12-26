import { Field, ObjectType, ArgsType } from "@nestjs/graphql";

@ArgsType()
export class AuthArgs {
    @Field(()=>String)
    email: string;

    @Field(()=>String)
    password: string;
}