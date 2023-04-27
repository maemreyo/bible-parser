import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import FolderSynchronizer from './providers/FolderSynchronizer';
import BibleParser from './parsers/BibleParser';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const folderSynchronizer = new FolderSynchronizer();
  folderSynchronizer.createJsonFolders();

  const srcDir = path.resolve(__dirname, '../src');
  const sourceFolderPath = path.join(srcDir, 'data/source/en/asv');
  const targetFolderPath = path.join(srcDir, 'data/target');
  // const sourceFolderPath = path.join(srcDir, 'data/source/vi/vie1934');
  const bible = new BibleParser(
    sourceFolderPath,
    targetFolderPath,
  ).parseFolder();

  await app.listen(4567);
}
bootstrap();
