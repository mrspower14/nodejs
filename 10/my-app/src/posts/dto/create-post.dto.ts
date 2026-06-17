import {IsOptional, IsString, MinLength} from 'class-validator';
export class CreatePostDto {
    @IsString()
    @MinLength(2)
    title: string;

    @IsString()
    @MinLength(2)
    content: string;

    @IsOptional()
    @IsString()
    author?: string;
}
