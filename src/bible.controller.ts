import { Controller, Get } from '@nestjs/common';
import { BibleService } from './bible.service';

@Controller('bible')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get()
  parseBibleTextFolder() {
    // Call the parseBibleTextFolder function from the service
    const json = this.bibleService.parseBibleTextFolder('static/raw/vie2011');
    return json;
  }
}
