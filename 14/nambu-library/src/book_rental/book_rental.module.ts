import { Module } from '@nestjs/common';
import { BookRentalService } from './book_rental.service';
import { BookRentalController } from './book_rental.controller';

@Module({
  controllers: [BookRentalController],
  providers: [BookRentalService],
})
export class BookRentalModule {}
