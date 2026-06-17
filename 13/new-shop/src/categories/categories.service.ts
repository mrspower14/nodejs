import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor (private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const exists = await this.prisma.category.findUnique({
      where: {name: createCategoryDto.name}
    });
    if (exists) {
      throw new ConflictException(`${createCategoryDto.name}은(는) 이미 존재하는 분류입니다.`);
    }
    return this.prisma.category.create({data: createCategoryDto});
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: { id: "asc"}
    });
  }

  async findOne(id: number) {
    const exists = await this.prisma.category.findUnique({
      where : {id}
    });
    if (!exists) throw new NotFoundException(`존재하지 않는 분류 ${id}입니다.`);
    return exists;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    const exists = await this.prisma.category.findUnique({ where: {name: updateCategoryDto.name}});
    if (exists && exists.id !== id) {
      throw new ConflictException(`${updateCategoryDto.name} 이미 존재하는 분류입니다.`);
    }

    return await this.prisma.category.update({ where: {id}, data: updateCategoryDto})
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.category.delete({ where: { id: id}});
    return {deleted: id};
  }
}
