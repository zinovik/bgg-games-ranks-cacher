import * as functions from '@google-cloud/functions-framework';
import { Main } from './main/Main';
import { BGGGamesRanksService } from './data/BGGGamesRanks.service';
import { GoogleStorageService } from './storage/GoogleStorage.service';

const BUCKET_NAME = 'boardgamegeek';
const FILE_NAME = 'bgg-games-ranks-top1000-latest.json';
const PARSER_URL =
    'https://us-central1-zinovik-project.cloudfunctions.net/bgg-games-ranks-parser';

functions.http('main', async (_req, res) => {
    console.log('Triggered!');

    const main = new Main(
        new BGGGamesRanksService(PARSER_URL),
        new GoogleStorageService(BUCKET_NAME, FILE_NAME)
    );

    await main.sendMessage();

    console.log('Done!');

    res.status(200).json({
        result: 'success',
    });
});
