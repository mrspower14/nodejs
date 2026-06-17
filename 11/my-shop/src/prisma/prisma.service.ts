import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// PrismaClient를 Nestjs 생명주기에 연결
// 모듈이 뜰 때 (Prisma) DB 연결하고, 모듈이 내려갈떄 DB 연결을 닫는다.
@Injectable()
export class PrismaService extends PrismaClient 
    implements OnModuleInit, OnModuleDestroy { 
        async onModuleInit() {
            await this.$connect(); //prisma client가 커넥션풀링 
        }

        async onModuleDestroy() {
            await this.$disconnect();
        }
        
    }

//cmd + . -> import 목록 보여준다.