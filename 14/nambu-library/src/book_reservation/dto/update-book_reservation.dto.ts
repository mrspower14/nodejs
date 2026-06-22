import { PartialType } from '@nestjs/mapped-types';
import { CreateBookReservationDto } from './create-book_reservation.dto';

export class UpdateBookReservationDto extends PartialType(CreateBookReservationDto) {}
