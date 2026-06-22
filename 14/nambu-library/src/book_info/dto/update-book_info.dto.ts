import { PartialType } from '@nestjs/mapped-types';
import { CreateBookInfoDto } from './create-book_info.dto';

export class UpdateBookInfoDto extends PartialType(CreateBookInfoDto) {}
