import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FolderService } from './folder.service';
import { Folder as FolderDB } from './db/schemas/folder.schema';
import { Folder as FolderSchema } from './db/schemas/folder.schema'
import { Folder, FolderArgs } from './graphql/models/folder.schema';

@Resolver(()=>Folder)
export class FolderResolver {
    constructor(
        private folderService:FolderService
    ){}

    @Query(()=> String, { name: "helloFolder" })
    helloWorld(): string {
        return 'Hola Folder';
    }

    @Mutation(() => Folder, { name: "folderRegister" })
    register(@Args() folder: FolderArgs): Promise<FolderSchema>
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
