import { Injectable } from '@nestjs/common';
import * as path from 'path';
import FolderSynchronizer from './providers/FolderSynchronizer';
import BibleParser from './parsers/BibleParser';

@Injectable()
export class BibleService {
  private readonly srcDir: string = path.resolve(__dirname, '../src');
  private readonly defaultTargetFolderPath: string = path.join(
    this.srcDir,
    'data/target',
  );

  parseBibleTextFolder(sourceFolderPath: string, targetFolderPath: string = this.defaultTargetFolderPath) {
    const folderSynchronizer = new FolderSynchronizer();
    folderSynchronizer.createJsonFolders();

    const bibleParser = new BibleParser(sourceFolderPath, targetFolderPath);
    bibleParser.parseFolder();
  }
}
