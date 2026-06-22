import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookReservationDto } from './dto/create-book_reservation.dto';
import { UpdateBookReservationDto } from './dto/update-book_reservation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as funcDate from '../common/commonDateFunc';
import * as commFunc from '../common/commonFunc';

@Injectable()
export class BookReservationService {
  
  constructor (private readonly prisma: PrismaService) {}

  async create(createBookReservationDto: CreateBookReservationDto, memId: number) {
    // 체크사항 필요
    // 도서상태, 회원상태 체크 
    // 예약가능 상태
    // 이미 예약되어 있는지
    const avail = await commFunc.getAvailReserv(memId, createBookReservationDto.bookId);
    if (!avail) return ({message: "도서 예약이 불가합니다."});

    return this.prisma.bookReservation.create({
          data: { 
            memId: memId,
            bookId: createBookReservationDto.bookId,
            reservDt: funcDate.getToday() 
          }
        });
  }

  findAll(memId: number) {
    return this.prisma.bookReservation.findMany({
      where: {memId: memId},
      select: { id: true, memId: true, bookId: true, reservDt: true,
        member: true,
        bookInfo: true
      },
      orderBy: {id: "asc"}
    });
  }

  async findOne(id: number) {
    const exists = await this.prisma.bookReservation.findUnique({ 
      where: {id},
      select: { id: true, memId: true, bookId: true, reservDt: true,
        member: true,
        bookInfo: true
      },
    });
    if (!exists) {
      throw new NotFoundException(`예약정보 ${id}를 찾을 수 없습니다.`)
    }
    return exists;
  }

  update(id: number, updateBookReservationDto: UpdateBookReservationDto, memId: number) {
    return `This action updates a #${id} bookReservation`;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.bookReservation.delete( {where: {id}});
    return {deleted: id};
  }

  async moveToRent(id: number, memId: number) {
    // 1. 예약 목록을 조회 
    const resv = await this.prisma.bookReservation.findUnique({
      where: {id: id, memId: memId}  
    });
    //console.log(memId);
    if (!resv) {
      throw new BadRequestException(`예약중인 도서가 없습니다.`);
    }

    let rentCnt = Number(commFunc.getAvailResvRent(memId));
    if (rentCnt >= 2) {
      throw new ConflictException("도서 대출은 3권까지 가능합니다.");
    }

    // 2.transction을 감싸서 작업할 준비 
    let bookRent;
    await this.prisma.$transaction(async (tx) => {
        //3.create bookRental 
         bookRent  = await tx.bookRental.create({
          data: {
            memId: memId,
            bookId: resv.bookId,
            rentDt: funcDate.getToday(),
            dueDt: funcDate.getAddDay(funcDate.getToday(), 14),
            extCnt: 0,
            returnYn: false
          }  
        });

      //4.예약 테이블 비우기
      await tx.bookReservation.deleteMany({where : {memId : memId}});
    });

    return bookRent ;
  }

}
