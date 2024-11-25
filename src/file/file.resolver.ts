import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { File as FileSchema } from './db/schemas/file.schema';
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
    getAll(): Promise<FileSchema[]>
    {
        return this.fileService.findAll();
    }

    @Query(()=>File, { name: "fileGetById" })
    getById(@Args({ name: "id", type: ()=>String }) id:string): Promise<FileSchema>
    {
        return this.fileService.findById(id);
    }

    @Mutation(() => File, { name: "fileRegister" })
    register(@Args('file_data') file: FileInput): Promise<FileSchema>
    {
        return this.fileService.create(file);
    }
}
