import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './db/schemas/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
    ],
    providers: [UserResolver, UserService],
})
export class UserModule {}