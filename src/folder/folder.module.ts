import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Folder, FolderSchema } from './db/schemas/folder.schema';
import { FolderService } from './folder.service';
import { FolderResolver } from './folder.resolver';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Folder.name,
                schema: FolderSchema
            }
        ]),
    ],
    providers: [FolderService, FolderResolver],
    controllers: [],
    exports: [ FolderService ]
})
export class FolderModule {}