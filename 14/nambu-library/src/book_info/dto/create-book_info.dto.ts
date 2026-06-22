import { ApiProperty } from "@nestjs/swagger";
import { BookStatus } from "@prisma/client";
import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateBookInfoDto {

    @ApiProperty({example: "9788960779990"})
    @IsString()
    @MinLength(10)
    bookIsbn: string;

    @ApiProperty({example: "노드JS와 몽고DB로 웹 개발 시작하기"})
    @IsString()
    @MinLength(2)
    bookNm:string;

    @ApiProperty({example: "에이콘출판"})
    @IsString()
    publisher:string;

    @ApiProperty({example: "미툰 사티시"})
    @IsString()
    author:string;
  
    @ApiProperty({example: ""})
    @IsString()
    image:string;

    @ApiProperty({example: "NORMAL"})
    @IsOptional()
    @IsIn(["NORMAL", "DISPOSED"])
    bookStatus?: "NORMAL" | "DISPOSED";
  
    @ApiProperty({example: "false"})
    @IsBoolean()
    rentYn:boolean;

}
