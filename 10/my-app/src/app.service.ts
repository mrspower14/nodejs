import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getSayHi(): string {
    return "안녕하세요. 홍길동입니다!";
  }

  getProfile(): string {
    return "안녕하세요. 개인정보 보여드립니다.";
  }

  getPath(): string {
    return "안녕하세요. 경로 안내입니다.";
  }
}
