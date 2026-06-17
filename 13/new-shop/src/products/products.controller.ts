import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import {CurrentUser, type AuthUser } from 'src/common/current-user.decorator';


@ApiTags("products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: "상품등록"})
  create(@Body() createProductDto: CreateProductDto,
         @CurrentUser() user: AuthUser 
  ) {
    console.log(user);
    return this.productsService.create(createProductDto, user.id);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
    @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: "상품수정"})
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @CurrentUser() user: AuthUser) {
    return this.productsService.update(+id, updateProductDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
