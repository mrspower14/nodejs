import { PartialType } from '@nestjs/mapped-types';
import { CreateBookRentalDto } from './create-book_rental.dto';

export class UpdateBookRentalDto extends PartialType(CreateBookRentalDto) {}
