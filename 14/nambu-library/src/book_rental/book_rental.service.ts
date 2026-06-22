import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateBookRentalDto } from './dto/create-book_rental.dto';
import { UpdateBookRentalDto } from './dto/update-book_rental.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as funcDate from '../common/commonDateFunc';
import * as commFunc from '../common/commonFunc';

@Injectable()
export class BookRentalService {

  constructor (private readonly prisma: PrismaService) {}

  async create(createBookRentalDto: CreateBookRentalDto, memId: number) {

    //try {
      const avail = await commFunc.getAvailRent(memId, createBookRentalDto.bookId);
      if (!avail) return ({message: "도서 대출이 불가합니다."});

      let bookRent;
      await this.prisma.$transaction(async (tx) => {
        //1.create bookRental 
        bookRent  = await tx.bookRental.create({
          data: {
            memId: memId, 
            bookId: createBookRentalDto.bookId,
            rentDt: funcDate.getToday(),
            dueDt: funcDate.getAddDay(funcDate.getToday(), 14),
            returnDt: "",
            extCnt: 0,
            returnYn: false 
          }
        });

        //2.도서상태 변경
        await tx.bookInfo.update({
          where: { id: createBookRentalDto.bookId },
          data: { rentYn: true}
        })
        
      });
      return bookRent;

    // } catch(err) {
    //   console.log('err',err);
    //   return  ({message: err});
    // }
  
  }

  async findAll(memId: number) {
    return await this.prisma.bookRental.findMany({
      where: { memId: memId},
      include: {
        member : {
            select: {id: true, nickName: true}
          }, 
        bookInfo : {
            select: {id: true, bookNm: true, bookIsbn: true}
          } 
      },
      orderBy: { id: "desc"}
    });
  }

  async findOne(id: number) {

    return await this.prisma.bookRental.findUnique({
      where: {id},
      include: {
        member : {
            select: {id: true, nickName: true}
          }, 
        bookInfo : {
            select: {id: true, bookNm: true, bookIsbn: true, image: true}
          } 
      },
    });
  }

  async update(id: number, updateBookRentalDto: UpdateBookRentalDto, memId: number) {
    
    const findBookRent = await this.findOne(id);
    if (findBookRent!.extCnt > 0) {
      return ({message: "이미 대출 연장된 도서입니다."});
    }
    if (findBookRent!.dueDt < funcDate.getToday() ) {
      return ({message: "연체된 도서는 연장 불가합니다."});
    }

    const avail = await commFunc.getAvailExtend(memId, findBookRent!.bookId);
    if (!avail) return ({message: "도서 연장이 불가합니다."});

    if (!findBookRent || findBookRent.dueDt) {
        findBookRent!.dueDt = funcDate.getAddDay(findBookRent!.rentDt, 14)
    }
    const bookRent = await this.prisma.bookRental.update({
                            where : {id: id}, 
                            data: {
                              dueDt: funcDate.getAddDay(findBookRent!.dueDt, 7),
                              extCnt: 1
                            }
                          });
    return bookRent;
  }

  async remove(id: number, memId: number) {
    const bookRentInfo = await this.findOne(id);
    //console.log(memId, bookRentInfo!.memId);
    if (bookRentInfo!.memId !== memId) {
      throw new BadRequestException(`회원번호를 확인하세요.`);
    }
    const diffDt = funcDate.getDateDiff(bookRentInfo?.dueDt, funcDate.getToday() );
    //console.log("diffDtdiffDtdiffDtdiffDtdiffDt", funcDate.getToday(), bookRentInfo?.dueDt , diffDt);

    
    const memberInfo = await this.prisma.member.findUnique({ where : { id: memId}});
    let getDt = funcDate.getToday();
    if (diffDt > 0 && memberInfo?.rentAvailDt) {
      getDt = memberInfo?.rentAvailDt > getDt ? memberInfo?.rentAvailDt : getDt;
    }
    let bookRent;
    await this.prisma.$transaction(async (tx) => {
      if (diffDt > 0) {
        await tx.member.update({
          where: { id: memId},
          data: {
            rentAvailYn: false,
            //rentAvailDt: funcDate.getAddDay(funcDate.getToday(), diffDt)
            rentAvailDt: funcDate.getAddDay(getDt, diffDt)
          }
        });
      } 

      await tx.bookInfo.update({
        where : {id: bookRentInfo?.bookId},
        data : { rentYn: false} 
      });
  
      bookRent = await tx.bookRental.update({
                      where : {id: id}, 
                      data: {
                        returnDt: funcDate.getToday(),
                        returnYn: true
                      }
                    });
    });

    return bookRent;
  }

  // async checkout(memId: number) {
  //   // 1. 예약 목록을 조회 
  //   const resv = await this.prisma.bookReservation.findMany({
  //     where: {memId: memId}  
  //   });
  //   console.log(memId);
  //   if (resv.length === 0) {
  //     throw new BadRequestException(`예약중인 도서가 없습니다.`);
  //   }
  //   if (resv.length > 3) {
  //     throw new BadRequestException(`예약도서는 3권까지 가능합니다.`);
  //   }

  //   let rentCnt = Number(commFunc.getAvailResvRent(memId));

  //   // 2.transction을 감싸서 작업할 준비 
  //   return this.prisma.$transaction(async (tx) => {
  //     for (const item of resv) {
  //       if (rentCnt > 3) {
  //         throw new ConflictException("도서 대출은 3권까지 가능합니다.");
  //       }
  //       //3.create bookRental 
  //       const bookRent  = await tx.bookRental.create({
  //         data: {
  //           memId: memId,
  //           bookId: item.bookId,
  //           rentDt: funcDate.getToday(),
  //           dueDt: funcDate.getAddDay(funcDate.getToday(), 14),
  //           extCnt: 0,
  //           returnYn: false
  //         }  
  //       });
  //       rentCnt++;
  //     }  //end of for

  //     //4.예약 테이블 비우기
  //     await tx.bookReservation.deleteMany({where : {memId : memId}});
  //   });
  // }

}
