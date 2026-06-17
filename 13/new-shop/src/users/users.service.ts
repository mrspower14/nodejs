import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';


@Injectable()
export class UsersService {

  constructor ( private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({
      where: {email: createUserDto.email}
    });
    if (exists) throw new ConflictException("이미 가입된 이메일 입니다.");
    return this.prisma.user.create({data: createUserDto});
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: {id: "asc"}
    });
  }

  async findOne(id: number) {
    const exists = await this.prisma.user.findUnique({ where: {id}});
    if (!exists) {
      throw new NotFoundException(`사용자 ${id}를 찾을 수 없습니다.`)
    }
    return exists;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const exists = await this.prisma.user.findUnique({ 
      where: {email: updateUserDto.email}
    });
    if (exists && exists.id !== id) {
      throw new ConflictException(`${updateUserDto.email} 이미 있는 이메일 입니다.`);
    }

    return await this.prisma.user.update({where: {id}, data: updateUserDto})
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete( {where: {id}});
    return {deleted: id};
  }

  //회원가입시 사용 목적
  async createUser(data: {email: string, name: string, password: string, role: Role}) {
    return await this.prisma.user.create({data});
  }

  //로그인시 사용 목적
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: {email}});
  }
}
