import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { BookInfoModule } from './book_info/book_info.module';
import { BookRentalModule } from './book_rental/book_rental.module';
import { BookReservationModule } from './book_reservation/book_reservation.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { SendMailModule } from './send_mail/send_mail.module';

@Module({
  imports: [MembersModule, BookInfoModule, BookRentalModule, BookReservationModule, PrismaModule, AuthModule,
            MailerModule.forRoot({
              transport: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // 587 포트는 false, 465 포트는 true
                auth: {
                  user: process.env.EMAIL_USER, // 보내는 사람 이메일 (예: abc@gmail.com)
                  pass: process.env.EMAIL_PASS, // Gmail에서 발급받은 '앱 비밀번호'
                },
              },
              defaults: {
                from: '"No Reply" <mrspower14@gmail.com>', // 기본 발신자 설정
              },
            }),
            SendMailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
