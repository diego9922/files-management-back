import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FolderService } from './folder.service';
import { Folder as FolderDB } from './db/schemas/folder.schema';
import { FolderObject, FolderArgs, FolderInput } from './graphql/models/folder.model';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { LogedUser } from 'src/auth/auth.decorator';
import { UserFound } from 'src/user/db/schemas/user.schema';

@Resolver(()=>FolderObject)
@UseGuards(JwtAuthGuard)
export class FolderResolver {
    constructor(
        private folderService:FolderService
    ){}

    @Query(()=> String, { name: "helloFolder" })
    helloWorld(@LogedUser() user): string {
        console.log("hello|LogedUser:", user);
        return 'Hola Folder';
    }

    @Mutation(()=>FolderObject, { name: "folderRegister" })
    register(@LogedUser() user:UserFound, @Args() folder: FolderArgs): Promise<FolderDB>
    {
        return this.folderService.create(user, folder);
    }

    @Mutation(()=>FolderObject, { name: "folderUpdate" })
    update(@LogedUser() user:UserFound, @Args({ type: ()=>String, name: "id" }) id:string, @Args('fileData') folder:FolderInput): Promise<FolderDB>
    {
        return this.folderService.update(user, id, folder);
    }

    @Query(()=>[FolderObject], { name: "folderGetAll" })
    getAll(): Promise<FolderDB[]>
    {
        return this.folderService.findAll();
    }

    @Query(()=>FolderObject, { name: "folderGetById" })
    getById(@Args({ name: "id", type: ()=>String }) id:string): Promise<FolderDB>
    {
        return this.folderService.findById(id);
    }
}
