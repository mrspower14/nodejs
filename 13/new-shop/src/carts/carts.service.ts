import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartsService {

  constructor (private readonly prisma: PrismaService){}
  async create(createCartDto: CreateCartDto, userId: number) {
    const product = await this.prisma.product.findUnique({
      where: {id : createCartDto.productId}
    })
    if (!product) {
      throw new NotFoundException(`상품 ${createCartDto.productId}이 없어요`);
    }

    return this.prisma.cartItem.upsert({
      where : {userId_productId: {userId: userId, productId: createCartDto.productId}},
      //update cartitem set quantity = quantity + 1 where userid=? and productid=?
      update: {quantity: {increment: createCartDto.quantity}},  
      //insert cartitem(userid, productid, quantity) values (?,?,?)
      create: {userId, productId: createCartDto.productId, quantity: createCartDto.quantity}
    });
  }

  findAll() {
    return `This action returns all carts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
