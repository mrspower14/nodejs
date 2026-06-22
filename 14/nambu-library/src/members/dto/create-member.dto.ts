import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDateString, IsEmail, IsIn, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator";

export class CreateMemberDto {
    @ApiProperty({ example: "sellerId@example.com"})
    @IsEmail()
    email: string;

    @ApiProperty({ example: "책벌레"})
    @IsString()
    @MinLength(2)
    nickName: string;

    @ApiProperty({ example: "book1234"})
    @IsString()
    @MinLength(3)
    password: string;

    @ApiProperty({ example: "01033331234"})
    @IsPhoneNumber('KR')
    telNo: string;

    @ApiProperty({example: "NORMAL"})
    @IsOptional()
    @IsIn(["NORMAL", "WITHDRAWAL"])
    memStatus?: "NORMAL" | "WITHDRAWAL"

    @ApiProperty({ example: true})
    @IsBoolean()
    rentAvailYn: boolean
    
    @ApiProperty({ example: "20260618"})
    @IsDateString()
    rentAvailDt: string
}
