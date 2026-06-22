import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, ParseIntPipe, UnsupportedMediaTypeException, Query } from '@nestjs/common';
import { BookInfoService } from './book_info.service';
import { CreateBookInfoDto } from './dto/create-book_info.dto';
import { UpdateBookInfoDto } from './dto/update-book_info.dto';
import { imageUploadOptions } from 'src/common/upload.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';


@ApiTags("bookInfo")
@Controller('bookInfo')
export class BookInfoController {
  constructor(private readonly bookInfoService: BookInfoService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOperation({summary: "도서 등록"})
  create(@Body() createBookInfoDto: CreateBookInfoDto) {
    return this.bookInfoService.create(createBookInfoDto);
  }

  // @Get()
  // @ApiOperation({summary: "도서 목록 조회"})
  // findAll() {
  //   return this.bookInfoService.findAll();
  // }

  @Get('search')
  @ApiOperation({summary: "도서 목록 검색 조회"})
  @ApiQuery({name: 'keyword', required: false, type: String, description:'책제목'})
  findSearchName(@Query('keyword') keyword?: string) {
    if (!keyword) keyword = "";
    return this.bookInfoService.findSearchName(keyword);
  }

  @Get(':id')
  @ApiOperation({summary: "도서 정보 상세 조회"})
  findOne(@Param('id') id: string) {
    return this.bookInfoService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()  
  @ApiOperation({summary: "도서 정보 수정"})
  update(@Param('id') id: string, @Body() updateBookInfoDto: UpdateBookInfoDto) {
    return this.bookInfoService.update(+id, updateBookInfoDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "도서 폐기"})
  remove(@Param('id') id: string) {
    return this.bookInfoService.remove(+id);
  }

  @Post(":id/images")
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {image: {type: "string", format: "binary"}}
    }
  })
  @UseInterceptors(FileInterceptor("image", imageUploadOptions))
  @ApiOperation({summary: "도서 이미지 업로드"})
  addImage(
    @Param("id", ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File
  ){ 
    if (!file) throw new UnsupportedMediaTypeException(`업로드 이미지가 없어요`);
    return this.bookInfoService.addImage(id, file);
  }
}
