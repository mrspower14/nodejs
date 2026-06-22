import { Module } from '@nestjs/common';
import { BookReservationService } from './book_reservation.service';
import { BookReservationController } from './book_reservation.controller';

@Module({
  controllers: [BookReservationController],
  providers: [BookReservationService],
})
export class BookReservationModule {}
