import { Module } from '@nestjs/common';
import { SendMailService } from './send_mail.service';
import { SendMailController } from './send_mail.controller';

@Module({
  controllers: [SendMailController],
  providers: [SendMailService],
})
export class SendMailModule {}
