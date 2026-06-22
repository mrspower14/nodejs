import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEmail, IsIn, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

//POST  /auth/register 요청 본문
export class RegisterDto {

    @ApiProperty({example: "book1@demo.com"})
    @IsEmail()
    email: string;

    @ApiProperty({example: "secret123"})
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({example: "책벌레"})
    @IsString()
    @MinLength(2)
    nickName: string;

    @ApiProperty({ example: "01033331234"})
    @IsPhoneNumber('KR')
    telNo: string;

    @ApiProperty({example: "NORMAL"})
    @IsOptional()
    @IsIn(["NORMAL", "WITHDRAWAL"])
    memStatus: "NORMAL" | "WITHDRAWAL"

    @ApiProperty({ example: true})
    @IsBoolean()
    rentAvailYn: boolean
    
    @ApiProperty({ example: ""})
    rentAvailDt: string
} 