import * as fs from 'fs';
import * as path from 'path';
import BibleReader from 'src/providers/BibleReader';
import { BibleVerse, FileLike } from 'src/utils/types';

class BibleParser {
  private readonly sourceFolderPath: string;
  private readonly targetFolderPath: string;

  constructor(sourceFolderPath: string, targetFolderPath: string) {
    this.sourceFolderPath = sourceFolderPath;
    this.targetFolderPath = targetFolderPath;
  }
  private readSourceFolder = (sourceFolderPath: string): FileLike[] =>
    fs.readdirSync(sourceFolderPath);

  private parseFiles = (folderPath: string, files: FileLike[]) => {
    files.flatMap((file: FileLike, _) => {
      const filePath = path.join(folderPath, file);

      return this.parseFile(filePath);
    });
  };

  private parseLine = (
    language: string,
    content: string,
    verseNumber: number,
    chapter: number,
    translationId: string,
    bookId: string,
    bookName: string,
  ): BibleVerse => ({
    language,
    chapter,
    verse: verseNumber,
    content,
    translation_id: translationId,
    book_id: bookId,
    book_name: bookName,
  });

  private parseFile = (filePath: string) => {
    const bibleReader = new BibleReader();
    const { language, translationId, bookId, chapter, verses, bookName } =
      bibleReader.readFile(filePath);

    const bibleVerses = verses.map((verse, index) =>
      this.parseLine(
        language,
        verse,
        index + 1,
        chapter,
        translationId,
        bookId,
        bookName,
      ),
    );
    // write to folder logic here
    this.writeFolder(language, translationId, bookId, chapter, bibleVerses);

    return bibleVerses;
  };

  public parseFolder = () => {
    const files = this.readSourceFolder(this.sourceFolderPath);

    const bibleVerses = this.parseFiles(this.sourceFolderPath, files);
  };

  private writeFolder(
    language: string,
    translationId: string,
    bookId: string,
    chapter: number,
    verses: BibleVerse[],
  ) {
    const targetFilePath =
      path.join(this.targetFolderPath, language, translationId) +
      '/' +
      bookId +
      '-' +
      chapter +
      '.json';
    const versesJSON = JSON.stringify(verses, null, 2);
    fs.writeFileSync(targetFilePath, versesJSON, { flag: 'w' });
  }
}

export default BibleParser;
