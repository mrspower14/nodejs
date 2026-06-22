import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookInfoDto } from './dto/create-book_info.dto';
import { UpdateBookInfoDto } from './dto/update-book_info.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UPLOAD_DIR } from 'src/common/upload.config';

@Injectable()
export class BookInfoService {

  constructor (private readonly prisma: PrismaService){}

  async create(createBookInfoDto: CreateBookInfoDto) {
    const exists = await this.prisma.bookInfo.findUnique({
      where: {bookIsbn: createBookInfoDto.bookIsbn}
    });
    if (exists) throw new ConflictException("이미 등록된 도서 입니다.");

    return this.prisma.bookInfo.create({ data: createBookInfoDto});
  }

  findAll() {
    return this.prisma.bookInfo.findMany({
      orderBy: {id: "asc"}
    });
  }

  findSearchName(serchParam: string | null) {
    if (!serchParam) serchParam = "";
    return this.prisma.bookInfo.findMany({
      where : { bookNm : { contains: serchParam, mode: 'insensitive'}},
      orderBy: {id: "asc"}
    });
  }

  async findOne(id: number) {
    const exists = await this.prisma.bookInfo.findUnique({ where: {id}});
    if (!exists) {
      throw new NotFoundException(`도서번호 ${id}를 찾을 수 없습니다.`)
    }
    return exists;
  }

  async update(id: number, updateBookInfoDto: UpdateBookInfoDto) {
    await this.findOne(id);
    const exists = await this.prisma.bookInfo.findUnique({ 
      where: {bookIsbn: updateBookInfoDto.bookIsbn}
    });
    if (exists && exists.id !== id) {
      throw new ConflictException(`${updateBookInfoDto.bookIsbn} 이미 있는 도서번호 입니다.`);
    }

    return await this.prisma.bookInfo.update({where: {id}, data: updateBookInfoDto})
  }

  async remove(id: number) {
    await this.findOne(id);
    const bookRent = await this.prisma.bookRental.findMany({
      where : {bookId: id, returnYn: false}
    });
    if (bookRent.length >= 1) {
      throw new ConflictException(`대출 중인 도서입니다. 대출완료 후 폐기하세요.`);
    }
    // await this.prisma.bookInfo.delete( {where: {id}});
    // return {deleted: id};

    const book = await this.prisma.bookInfo.update({where: {id}, data: {bookStatus: "DISPOSED"}});
    return book;
  }

  async addImage(bookId: number, file: Express.Multer.File) {
    const product = await this.prisma.bookInfo.findUnique({
      where: {id : bookId}
    });

    //npx prisma migrage dev --name add-product-image
    //npx prisma generate
    const image = await this.prisma.bookInfo.update({
       where: {id : bookId}, data: {image: file.filename} 
    });

    return {id: image.id, url: `${UPLOAD_DIR}/${image.image}`};
  }

}
