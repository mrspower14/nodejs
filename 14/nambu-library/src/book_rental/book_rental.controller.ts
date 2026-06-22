import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookRentalService } from './book_rental.service';
import { CreateBookRentalDto } from './dto/create-book_rental.dto';
import { UpdateBookRentalDto } from './dto/update-book_rental.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser, type AuthMember  } from 'src/common/current-user.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("bookRental")
@Controller('bookRental')
export class BookRentalController {
  constructor(private readonly bookRentalService: BookRentalService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: "도서 대출"})
  create(@Body() createBookRentalDto: CreateBookRentalDto,
         @CurrentUser() member: AuthMember ) {
    return this.bookRentalService.create(createBookRentalDto, member.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: "도서 대출 목록"})
  findAll(@CurrentUser() member: AuthMember) {
    return this.bookRentalService.findAll(member.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: "대출 도서 정보"})
  findOne(@Param('id') id: string) {
    return this.bookRentalService.findOne(+id);
  }

  @Patch(':id')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: "대출 연장"})
  update(@Param('id') id: string, 
      @Body() updateBookRentalDto: UpdateBookRentalDto,
      @CurrentUser() member: AuthMember) {
    return this.bookRentalService.update(+id, updateBookRentalDto, member.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: "대출 반납"})
  remove(@Param('id') id: string,
         @CurrentUser() member: AuthMember) {
    return this.bookRentalService.remove(+id, member.id);
  }

  // @Post("checkout")
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOperation({summary: "예약도서 대출"})
  // checkout(@CurrentUser("id") memId:number){
  //   return this.bookRentalService.checkout(memId);
  // }
}
