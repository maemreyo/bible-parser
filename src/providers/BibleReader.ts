import { FileResult } from 'src/utils/types';
import * as fs from 'fs';
import * as path from 'path';

class BibleReader {
  private readonly fileNameRegex =
    /^([a-z]{2,3})-?(\w+?)_(\d{3})_(\w{3})_(\d{2})_read\.txt$/;

  private removeEmptyLines = (lines: string[]): string[] =>
    lines.filter((line) => line.trim() !== '');

  public readFile(filePath: string): FileResult {
    const fileNameMatch = this.fileNameRegex.exec(path.basename(filePath));

    if (!fileNameMatch) {
      throw new Error('Invalid file name format');
    }

    const [, language, translationId, _, bookId, chapter] = fileNameMatch;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split('\n').map((line) => line.trim());

    const bookName = lines[0];
    const verses = this.removeEmptyLines(lines).slice(2);

    return {
      language: language.slice(0, 2),
      translationId,
      bookId,
      chapter: parseInt(chapter, 10),
      verses,
      bookName,
    };
  }
}

export default BibleReader;
