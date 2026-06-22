import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { type AuthMember, CurrentUser } from 'src/common/current-user.decorator';

@ApiTags("members")
@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  // @Post()
  // @ApiOperation({ summary: "회원 등록"})
  // create(@Body() createMemberDto: CreateMemberDto) {
  //   return this.membersService.create(createMemberDto);
  // }

  // @Get()
  // @ApiOperation({ summary: "회원 목록 조회"})
  // findAll() {
  //   return this.membersService.findAll();
  // }

  // @Get(':id')
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "회원 정보 조회"})
  findOne(@CurrentUser() member: AuthMember) {
    return this.membersService.findOne(member.id);
  }

  //@Patch(':id')
  @Patch()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "회원 정보 수정"})
  update(@Body() updateMemberDto: UpdateMemberDto,
         @CurrentUser() member: AuthMember ) {
    return this.membersService.update(member.id, updateMemberDto); 
  }

  //@Delete(':id')
  @Delete()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "회원 탈퇴"})
  remove(@CurrentUser() member: AuthMember) {
    return this.membersService.remove(member.id);
  }

  @Patch('ChangeRentAvailYn')
  @ApiOperation({ summary: "연체회원 일괄 변경(대출가능여부)"})
  changeRentAvailYn() {
    return this.membersService.changeRentAvailYn();
  }
}
