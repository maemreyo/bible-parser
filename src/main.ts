import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import FolderSynchronizer from './providers/FolderSynchronizer';
import BibleParser from './parsers/BibleParser';
import * as path from 'path';
import { BibleService } from './bible.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const srcDir = path.resolve(__dirname, '../src');
  const sourceFolderPath = path.join(srcDir, 'data/source/en/asv');

  const bibleService = app.get(BibleService);

  bibleService.parseBibleTextFolder(sourceFolderPath);

  await app.listen(4567);
}
bootstrap();
