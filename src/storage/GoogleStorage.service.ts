import { Bucket, Storage, File } from '@google-cloud/storage';
import { StorageService } from './Storage.interface';
import { Data } from '../common/model/Data.interface';

export class GoogleStorageService implements StorageService {
    private readonly bucket: Bucket;

    constructor(
        private readonly bucketName: string,
        private readonly fileName: string
    ) {
        const storage: Storage = new Storage();
        this.bucket = storage.bucket(this.bucketName);
    }

    async setData(data: Data): Promise<void> {
        const file: File = this.bucket.file(this.fileName);
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
