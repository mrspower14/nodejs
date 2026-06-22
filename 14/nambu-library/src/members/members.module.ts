import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';

@Module({
  controllers: [MembersController],
  providers: [MembersService],
  exports: [MembersService]  //AuthModule 임포트
})
export class MembersModule {}
