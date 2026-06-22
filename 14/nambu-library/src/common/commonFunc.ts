import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { BookStatus, MemberStatus } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

const prisma = new PrismaService();
export async function getMemberInfo(memId: number) {
    const member = await prisma.member.findUnique({ where: {id: memId}});
    return member;
}

export async function  getBookInfo(bookId: number) {
    const book = await prisma.bookInfo.findUnique({ where: {id: bookId}});
    return book;
}

export async function  getBookReservInfo(bookId: number) {
    const bookReserv = await prisma.bookReservation.findMany({ where: {bookId: bookId}});
    return bookReserv;
}

export async function  getAvailRent(memId: number, bookId: number) {
    const member = await getMemberInfo(memId);
    
    if (member!.memStatus !== MemberStatus.NORMAL) { 
        throw new ConflictException("회원님은 도서 대출 가능 상태가 아닙니다.(회원상태)");
    }
    if (!member!.rentAvailYn)  {
        throw new ConflictException("회원님은 도서 대출 가능 상태가 아닙니다.(대출가능여부)");
    }

    const book = await getBookInfo(bookId);
    if (book!.bookStatus !== BookStatus.NORMAL) {
        throw new ConflictException("폐기된 도서는 대출 불가합니다.");
    }
    if (book!.rentYn) {
        throw new ConflictException("이미 대출 중인 도서입니다.");
    }

    const bookRent = await prisma.bookRental.findMany({ 
        where : {memId: memId, returnYn : false}
    });
    if (bookRent.length > 2 ) {
        throw new ConflictException("도서 대출은 3권까지 가능합니다.");
    }

    return true;
}

export async function  getAvailReserv(memId: number, bookId: number) {
    const member = await getMemberInfo(memId);
    //console.log('333333333333', member);
    if (member!.memStatus !== MemberStatus.NORMAL) { 
        throw new ConflictException("회원님은 도서 예약 가능 상태가 아닙니다.(회원상태)");
    }
    if (!member!.rentAvailYn)  {
        throw new ConflictException("회원님은 도서 예약 가능 상태가 아닙니다.(대출가능여부)");
    }

    const book = await getBookInfo(bookId);
    console.log('book: ', book)
    if (book!.bookStatus !== BookStatus.NORMAL) {
        throw new ConflictException("폐기된 도서는 예약 불가합니다.");
    }
    if (!book!.rentYn) {
        throw new ConflictException("대출 가능한 도서입니다.");
    }

    const bookReservInfo = await getBookReservInfo(bookId);
    console.log("bookReservInfobookReservInfobookReservInfo",bookReservInfo);
    if (bookReservInfo.length >= 1) {
        throw new ConflictException("이미 예약된 도서입니다.");
    }

    const bookReserv = await prisma.bookReservation.findMany({ 
        where : { memId: memId }
    });
    if (bookReserv.length > 2 ) {
        throw new ConflictException("도서 예약은 3권까지 가능합니다.");
    }

    return true;
}

export async function getAvailExtend(memId: number, bookId: number) {
    const member = await getMemberInfo(memId);
    
    if (member!.memStatus !== MemberStatus.NORMAL) { 
        throw new ConflictException("회원님은 도서 대출 가능 상태가 아닙니다.(회원상태)");
    }
    if (!member!.rentAvailYn)  {
        throw new ConflictException("회원님은 도서 대출 가능 상태가 아닙니다.(대출가능여부)");
    }

    const bookReservInfo = await getBookReservInfo(bookId);
    if (bookReservInfo.length >= 1) {
        throw new ConflictException("예약된 도서는 연장 불가합니다.");
    } 

    return true;
}

export async function getMemberWithdrawal(memId: number){
    const bookRent = await prisma.bookRental.findMany({ 
        where : {memId: memId, returnYn : false}
    });
    if (bookRent.length >= 1 ) {
        throw new ConflictException("대출중인 도서 반납 후 탈퇴하세요.");
    }

    return true;
}

export async function  getAvailResvRent(memId: number) {
    const bookRent = await prisma.bookRental.findMany({ 
        where : {memId: memId, returnYn : false}
    });
    if (bookRent.length > 2 ) {
        throw new ConflictException("도서 대출은 3권까지 가능합니다.");
    }

    return Number(bookRent.length);
}