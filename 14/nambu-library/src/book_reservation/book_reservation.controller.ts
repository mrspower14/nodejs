import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookReservationService } from './book_reservation.service';
import { CreateBookReservationDto } from './dto/create-book_reservation.dto';
import { UpdateBookReservationDto } from './dto/update-book_reservation.dto';
import { type AuthMember, CurrentUser } from 'src/common/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@ApiTags("bookReservation")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('bookReservation')
export class BookReservationController {
  
  constructor(private readonly bookReservationService: BookReservationService) {}

  @Post()
  @ApiOperation({summary: "도서 예약"})
  create(@Body() createBookReservationDto: CreateBookReservationDto,
         @CurrentUser() member: AuthMember) {
    return this.bookReservationService.create(createBookReservationDto, member.id);
  }

  @Get()
  @ApiOperation({summary: "예약도서 조회 "})
  findAll(@CurrentUser() member: AuthMember) {
    return this.bookReservationService.findAll(member.id);
  }

  @Get(':id')
  @ApiOperation({summary: "예약도서 상세 조회 "})
  findOne(@Param('id') id: string) {
    return this.bookReservationService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookReservationDto: UpdateBookReservationDto) {
  //   return this.bookReservationService.update(+id, updateBookReservationDto);
  // }

  @Delete(':id')
  @ApiOperation({summary: "도서 예약 취소"})
  remove(@Param('id') id: string) {
    return this.bookReservationService.remove(+id);
  }

  @Post("moveToRent/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: "예약도서 대출"})
  moveToRent(@Param('id') id: string, @CurrentUser("id") memId:number){
    return this.bookReservationService.moveToRent(+id, memId); 
  }
}
