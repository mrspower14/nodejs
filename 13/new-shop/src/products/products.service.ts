import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

  constructor (private readonly prisma: PrismaService){}

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        stock: createProductDto.stock,
        sellerId: createProductDto.sellerId,
        //M:N -> [1,2,3]
        //connet -> 새 프로덕트가 들어오면 product insert 하고,
        //기존 카테고리에 연결해줘(connect) 라는 의미
        //(id) => ({id})
        //connect : [{id: 1},{id: 2}]
        //(id) => {id} ({id:1})
        categories: { connect: createProductDto.categoryIds.map((id) => ({id}))}
      }
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        seller : true, categories: true
      },
      orderBy: { id: "asc"}
    })
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({
      where: {id},
      include: {
        seller : {
            select: {id: true, name: true}
          }, 
        categories: true
      },
    })
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: {id},
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
        stock: updateProductDto.stock,
        sellerId: updateProductDto.sellerId,
        //set: 상품 분류 연결을 전달해준 목록으로 전부 다시 정해라 
        //     기존 연결된 목록에 없는것은 중간테이블에서 삭제
        //     목록에 있는것 -> 이미 연결되어 있으면 유지, 없으면 insert 
        //     기존 [1,2] > 신규 [2,3] ==> 1:삭제, 2:유지, 3:연결추가 
        ...( updateProductDto.categoryIds? {
          categories: {set: updateProductDto.categoryIds.map((cid) => ({id: cid}))}
        }: {})
      }
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} product`;
  }

}
