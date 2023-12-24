import * as functions from '@google-cloud/functions-framework';
import { Main } from './main/Main';
import { BGGGamesRanksService } from './data/BGGGamesRanks.service';
import { GoogleStorageService } from './storage/GoogleStorage.service';

functions.http('main', async (_req, res) => {
    console.log('Triggered!');

    const main = new Main(
        new BGGGamesRanksService(),
        new GoogleStorageService()
    );

    try {
        await main.sendMessage();
    } catch (error) {
        console.error('Unexpected error occurred: ', (error as Error).message);
    }

    res.status(200).json({
        result: 'success',
    });
});
