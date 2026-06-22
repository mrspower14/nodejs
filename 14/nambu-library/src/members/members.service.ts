import { ConflictException, GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MemberStatus } from '@prisma/client';
import * as commFunc from '../common/commonFunc';
import { getToday } from 'src/common/commonDateFunc';

@Injectable()
export class MembersService {

  constructor ( private readonly prisma: PrismaService) {}
  
  async create(createMemberDto: CreateMemberDto) {
    const exists = await this.prisma.member.findUnique({
      where: {email: createMemberDto.email}
    });
    if (exists) throw new ConflictException("이미 가입된 이메일 입니다.");
    return this.prisma.member.create({ data: createMemberDto});
  }

  findAll() {
    return this.prisma.member.findMany({
      select: {id: true, email: true, nickName: true, memStatus: true, rentAvailYn: true, rentAvailDt: true},
      orderBy: {id: "asc"} 
    });
  }

  async findOne(id: number) {
    const exists = await this.prisma.member.findUnique({ 
      select: {
        id: true, email: true, nickName: true, memStatus: true, rentAvailYn: true, rentAvailDt: true,
        //bookRental: true,
        bookRental : {
          select: {id: true, bookId: true, rentDt: true, dueDt: true, returnYn: true, extCnt: true, returnDt: true, bookInfo: true},
          orderBy: {id: "desc"}
        }, 
        bookReservation: true, 
        // bookReservation : {
        //   select: {id: true, bookId: true, reservDt: true}
        // } 
      },
      where: {id}
    });
    if (!exists) {
      throw new NotFoundException(`사용자 ${id}를 찾을 수 없습니다.`)
    }
    return exists;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    await this.findOne(id);
    const exists = await this.prisma.member.findUnique({ 
      where: {email: updateMemberDto.email}
    });
    if (exists && exists.id !== id) {
      throw new ConflictException(`${updateMemberDto.email} 이미 있는 이메일 입니다.`);
    }

    const {password, ...memWithoutPassword} = await this.prisma.member.update({where: {id}, data: updateMemberDto})
    return memWithoutPassword;

  }

  async remove(id: number) {

    const member = await this.findOne(id);
    if (member.memStatus !== MemberStatus.NORMAL) {
      throw new ConflictException({message: "이미 탈퇴 처리된 회원입니다."});
    }
    const exists = await commFunc.getMemberWithdrawal(id);
    console.log("existsexistsexistsexists", exists);
    if (!exists){
      throw new ConflictException("대출중인 도서 반납 후 탈퇴하세요.");
    } 
    const {password, ...memWithoutPassword} = await this.prisma.member.update({where: {id}, data: {memStatus: "WITHDRAWAL"}});
    return memWithoutPassword; 
  }

  //회원가입시 사용 목적
  async createMember(data: {
    email: string, 
    nickName: string, 
    password: string, 
    telNo: string, 
    memStatus: MemberStatus,
    rentAvailYn: boolean,
    rentAvailDt: string}) {
    return await this.prisma.member.create({data});
  }

  //로그인시 사용 목적
  async findByEmail(email: string) {
    return await this.prisma.member.findUnique({ where: {email}});
  }

  async changeRentAvailYn() {
    return await this.prisma.member.updateMany({
      where: { rentAvailYn: false, rentAvailDt : { lte: getToday()}},
      data: { rentAvailYn: true}
    })
  }
}
