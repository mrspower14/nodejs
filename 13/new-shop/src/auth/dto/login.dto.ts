import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

// /POST /auth/login 요청 본문 이메일과 페스워드 
export class LoginDto {

    @ApiProperty({example: "seller@demo.com"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "secret123"})
    @IsString()
    @MinLength(6)
    password: string;
}