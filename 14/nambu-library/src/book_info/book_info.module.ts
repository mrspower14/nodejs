import { Module } from '@nestjs/common';
import { BookInfoService } from './book_info.service';
import { BookInfoController } from './book_info.controller';

@Module({
  controllers: [BookInfoController],
  providers: [BookInfoService],
})
export class BookInfoModule {}
