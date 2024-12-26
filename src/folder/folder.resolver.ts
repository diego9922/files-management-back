import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FolderService } from './folder.service';
import { Folder as FolderDB } from './db/schemas/folder.schema';
import { Folder, FolderArgs } from './graphql/models/folder.schema';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { LogedUser } from 'src/auth/auth.decorator';

@Resolver(()=>Folder)
export class FolderResolver {
    constructor(
        private folderService:FolderService
    ){}

    @UseGuards(JwtAuthGuard)
    @Query(()=> String, { name: "helloFolder" })
    helloWorld(@LogedUser() user): string {
        console.log("hello|LogedUser:", user);
        return 'Hola Folder';
    }

    @Mutation(() => Folder, { name: "folderRegister" })
    register(@Args() folder: FolderArgs): Promise<FolderDB>
    {
        return this.folderService.create(folder);
    }

    @Query(()=>[Folder], { name: "folderGetAll" })
    getAll(): Promise<FolderDB[]>
    {
        return this.folderService.findAll();
    }

    @Query(()=>Folder, { name: "folderGetById" })
    getById(@Args({ name: "id", type: ()=>String }) id:string): Promise<FolderDB>
    {
        return this.folderService.findById(id);
    }
}
