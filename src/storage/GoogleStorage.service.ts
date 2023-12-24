import { Bucket, Storage, File } from '@google-cloud/storage';
import { StorageService } from './Storage.interface';
import { Data } from '../common/model/Data.interface';

const BUCKET_NAME = 'boardgamegeek';
const FILE_NAME = 'top1000.json';

export class GoogleStorageService implements StorageService {
    private readonly storage: Storage = new Storage();
    private readonly bucket: Bucket;

    constructor() {
        this.bucket = this.storage.bucket(BUCKET_NAME);
    }

    async setData(data: Data): Promise<void> {
        const file: File = this.bucket.file(FILE_NAME);
        const dataBuffer = Buffer.from(JSON.stringify(data));
        await file.save(dataBuffer, {
            gzip: true,
            public: true,
            resumable: true,
            metadata: {
                contentType: 'application/json',
            },
        });
    }
}
