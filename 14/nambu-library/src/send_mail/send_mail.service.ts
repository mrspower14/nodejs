import { Injectable } from '@nestjs/common';
import { CreateSendMailDto } from './dto/create-send_mail.dto';
import { UpdateSendMailDto } from './dto/update-send_mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SendMailService {

  constructor(private readonly mailerService: MailerService) {}
  
  async sendWelcomeEmail(to: string, name: string): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: to,                // 수신자 이메일
        subject: 'NestJS 가입을 축하합니다!', // 제목
        text: `${name}님, 환영합니다!`,     // 일반 텍스트 본문
        html: `<b>${name}님</b>, 가입을 진심으로 환영합니다! 🎉`, // HTML 본문
      });
      return true;
    } catch (error) {
      console.error('메일 발송 실패:', error);
      return false;
    }
  }

  
  create(createSendMailDto: CreateSendMailDto) {
    return 'This action adds a new sendMail';
  }

  findAll() {
    return `This action returns all sendMail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sendMail`;
  }

  update(id: number, updateSendMailDto: UpdateSendMailDto) {
    return `This action updates a #${id} sendMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} sendMail`;
  }
}
