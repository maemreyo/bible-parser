import { Controller, Get } from '@nestjs/common';
import { BibleService } from './bible.service';

@Controller('bible')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get()
  parseBibleTextFolder(sourceFolderPath: string, targetFolderPath?: string) {
    // Call the parseBibleTextFolder function from the service
    const json = this.bibleService.parseBibleTextFolder(sourceFolderPath, targetFolderPath);
    return json;
  }
}
