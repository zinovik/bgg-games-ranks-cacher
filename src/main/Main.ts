import { DataService } from '../data/DataService.interface';
import { StorageService } from '../storage/Storage.interface';

export class Main {
    constructor(
        private readonly dataService: DataService,
        private readonly storageService: StorageService
    ) {
        this.dataService = dataService;
        this.storageService = storageService;
    }

    async sendMessage(): Promise<void> {
        console.time('Getting data from the data service');
        const data = await this.dataService.getData();
        console.timeLog('Getting data from the data service');

        console.time('Writing data to the storage service');
        await this.storageService.setData(data);
        console.timeLog('Writing data to the storage service');
    }
}
