import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibleController } from './bible.controller';
import { BibleService } from './bible.service';

@Module({
  imports: [],
  controllers: [AppController, BibleController],
  providers: [AppService, BibleService],
})
export class AppModule {}
