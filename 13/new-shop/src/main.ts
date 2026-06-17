import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true}));
  
  //Swagger
  const config = new DocumentBuilder()
      .setTitle("쇼핑몰 API (Relation 추가)")
      .setDescription("13장 판매자 1:N, 분류 M:N")
      .setVersion("1.0")
      .addBearerAuth()  //보호 라우트용 테스트 코튼 입력
      .build();

  SwaggerModule.setup("docs", app, SwaggerModule.createDocument(app, config));
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`new-shop -- http://localhost:${process.env.PORT} 기동 ... `);
}
bootstrap();
