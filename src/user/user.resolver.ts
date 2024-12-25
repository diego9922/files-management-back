import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User as UserDB } from './db/schemas/user.schema';
import { User, UserArgs } from './graphql/models/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {

    constructor(private userService:UserService){}

    @Query(()=>String, { name: "helloUser" })
    helloUser(): string
    {
        return "Hello from User";
    }

    @Mutation(()=>User, { name: "userRegister" })
    register(@Args() user:UserArgs): Promise<UserDB>
    {
        return this.userService.create(user);
    }

    @Query(()=>[User], { name: "userGetAll" })
    getAll(): Promise<UserDB[]>
    {
        return this.userService.findAll();
    }

    @Query(()=>User, { name: "userGetByEmail" })
    getByEmail(@Args({ name: "email", type: ()=>String }) email:string): Promise<UserDB>
    {
        return this.userService.findByEmail(email);
    }
}
