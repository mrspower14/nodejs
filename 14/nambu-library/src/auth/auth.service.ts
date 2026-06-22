import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class AuthService {
    constructor (
        private readonly membersService: MembersService, //회원가입 및 찾기 this.prisma.members.MembersService
        private readonly jwtService: JwtService         //AuthModule 
    ){}

    async register(dto: RegisterDto) {
        //기존 유저 체크 
        // 1) 이메일 중복 확인-있으면 409 컨플릭트 
        const exists = await this.membersService.findByEmail(dto.email);
        if (exists) throw new ConflictException(`이미 가입된 이메일입니다.`);
    
        //비밀번호 암호화 
        // 2) 평문 비빌번호를 암호화 -> bcrypt gotl(salt round 10) DB 해시만 저장
        const hashed = await bcrypt.hash(dto.password, 10);
        //유저 생성
        // 3. Uservervice.createUser  저장
        const user = await this.membersService.createMember({
            email: dto.email,
            nickName: dto.nickName,
            password: hashed,
            telNo: dto.telNo,
            memStatus: dto.memStatus,
            rentAvailYn: dto.rentAvailYn,
            rentAvailDt: dto.rentAvailDt
        });

        //비빌번호 빼고 나머지 데이터 반환
        //4. 응답에 password 필드를 제외한 값을 클라이언트에게 전달
        const {password, ...result} = user; 
        return result;
    }

    async login (dto: LoginDto) {
        //1) 이메일로 회원이 있는지 검사
        const user = await this.membersService.findByEmail(dto.email);
        //2) 회원이 있으면 평문암호화 db에 저장된 해시를 비교 bcrypt.compare
        if (!user) {
            throw new UnauthorizedException('이메일을 확인하세요'); 
        }
        const isRight = await bcrypt.compare(dto.password, user.password); //!.비밀번호는 반드시 있다.
        if (!user || !isRight ) {
            throw new UnauthorizedException(`이메일 또는 비밀번호를 확인하세요`);
        }

        const payload = {
            sub: user.id, email: user.email, nickName: user.nickName, telNo: user.telNo, memStatus: user.memStatus, rentAvailYn: user.rentAvailYn, rentAvailDt: user.rentAvailDt 
        }
        return {
            access_token: this.jwtService.sign(payload)
        }

    }
}
