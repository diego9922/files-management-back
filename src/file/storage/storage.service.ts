import { Injectable } from '@nestjs/common';
import { Storage, Bucket } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from 'graphql-upload-ts';

interface FileStorage {
    name: string;
    originalName: string;
    mimeType: string;
}

@Injectable()
export class StorageService {

    private storage:Storage; 
    private bucket:Bucket;

    constructor(){
        this.storage = new Storage({
            projectId: process.env.GCLOUD_PROJECT_ID,
            keyFilename: process.env.GCLOUD_JSON_KEY_FILE
        })
        this.bucket = this.storage.bucket(process.env.GCLOUD_STORAGE_BUCKET);
    }

    async upload(file:FileUpload):Promise<FileStorage>
    {
        const fileData = await file; 
        const fileStorage:FileStorage = {
            name: `${uuidv4()}_${fileData.filename}`,
            originalName: fileData.filename,
            mimeType: fileData.mimetype,
        };
        const bucketFile = this.bucket.file(fileStorage.name);
        const uploadFile = await fileData.createReadStream().pipe(bucketFile.createWriteStream(), { end: true });//@todo, do events onerror and onfinished as https://github.com/googleapis/nodejs-storage/blob/main/samples/streamFileUpload.js
        return fileStorage;
    }   
}
