import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './db/schemas/file.schema';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { StorageService } from './storage/storage.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: File.name, //name of de class, in this case is "File"
                schema: FileSchema,
            }
        ]),
    ],
    providers: [FileService, FileResolver, StorageService],
    controllers: []
})
export class FileModule {}
