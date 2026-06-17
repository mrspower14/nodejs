import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: "sellerId@example.com"})
    @IsEmail()
    email: string;

    @ApiProperty({ example: "홍길동"})
    @IsString()
    @MinLength(2)
    name: string;

}
