import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthArgs } from './graphql/models/auth.model';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
    constructor(
        private authService:AuthService
    ){}
    
    @Mutation(()=>String, { name: "login" })
    async login(@Args() loginData:AuthArgs): Promise<string|null>
    {
        const result = await this.authService.execute(loginData.email, loginData.password);
        return result;
    }

}
