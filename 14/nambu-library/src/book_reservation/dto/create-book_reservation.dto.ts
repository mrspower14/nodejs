import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateBookReservationDto {

    @ApiProperty({example: 1})
    @IsInt()
    bookId: number;
}
