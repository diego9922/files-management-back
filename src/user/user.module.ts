import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User as UserDB } from './db/schemas/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { FolderService } from 'src/folder/folder.service';
import { FolderModule } from 'src/folder/folder.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: UserDB.name,
                schema: UserSchema
            }
        ]),
        FolderModule
    ],
    providers: [UserResolver, UserDB, UserService],
    exports: [UserService]
})
export class UserModule {}