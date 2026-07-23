import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SendMailService } from './send_mail.service';
import { CreateSendMailDto } from './dto/create-send_mail.dto';
import { UpdateSendMailDto } from './dto/update-send_mail.dto';

@Controller('send-mail')
export class SendMailController {
  constructor(private readonly sendMailService: SendMailService) {}

  @Post('send')
  async sendMail() {
    //async sendMail(@Body() body: { email: string; name: string }) {
    const result = await this.sendMailService.sendWelcomeEmail("hoddi98@gmail.com", "혜빈님...");
    if (result) {
      return { success: true, message: '메일이 성공적으로 발송되었습니다.' };
    } else {
      return { success: false, message: '메일 발송에 실패했습니다.' };
    }
  }

  @Post()
  create(@Body() createSendMailDto: CreateSendMailDto) {
    return this.sendMailService.create(createSendMailDto);
  }

  @Get()
  findAll() {
    return this.sendMailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sendMailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSendMailDto: UpdateSendMailDto) {
    return this.sendMailService.update(+id, updateSendMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sendMailService.remove(+id);
  }
}
