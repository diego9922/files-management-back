import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { File as FileDB } from './db/schemas/file.schema';
import { File, FileInput} from './graphql/models/file.model';
import { FileService } from './file.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UserFound } from 'src/user/db/schemas/user.schema';
import { LogedUser } from 'src/auth/auth.decorator';

@Resolver(()=>File)
@UseGuards(JwtAuthGuard)
export class FileResolver {
    constructor (private fileService: FileService) {}
    
    @Query(()=> String, { name: "hello" })
    helloWorld(): string {
        return 'Hola Mundo';
    }

    @Query(()=>[File], { name: "fileGetAll" })
    getAll(): Promise<FileDB[]>
    {
        return this.fileService.findAll();
    }

    @Query(()=>File, { name: "fileGetById" })
    getById(@Args({ name: "id", type: ()=>String }) id:string): Promise<FileDB>
    {
        return this.fileService.findById(id);
    }

    @Mutation(() => File, { name: "fileRegister" })
    register(@LogedUser() user:UserFound, @Args('file_data') file: FileInput): Promise<FileDB>
    {
        return this.fileService.create(user, file);
    }

    @Mutation(() => File, { name: "fileUpdate" })
    update(@LogedUser() user:UserFound, @Args({ name: "id", type: ()=>String }) id:string, @Args('file_data') file:FileInput): Promise<FileDB>
    {
        return this.fileService.update(user, id, file);
    }
}
