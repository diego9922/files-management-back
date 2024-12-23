import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { File as FileDB } from './db/schemas/file.schema';
import { File, FileInput} from './graphql/models/file.model';
import { FileService } from './file.service';

@Resolver(()=>File)
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
    register(@Args('file_data') file: FileInput): Promise<FileDB>
    {
        return this.fileService.create(file);
    }

    @Mutation(() => File, { name: "fileUpdate" })
    update(@Args({ name: "id", type: ()=>String }) id:string, @Args('file_data') file:FileInput): Promise<FileDB>
    {
        return this.fileService.update(id, file);
    }
}
