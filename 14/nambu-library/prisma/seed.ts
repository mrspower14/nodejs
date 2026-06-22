import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash("admin1234", 10)

    //upsert: update,insert 
    const admin = await prisma.member.upsert({
        where : {email: "admin@demo.com"},
        update: {},
        create: {
            email: "admin@demo.com",
            password,
            nickName: "관리자",
            telNo: "02-1111-2222",
            memStatus: "NORMAL",
            rentAvailYn: true,
            rentAvailDt: '' 
        }
    });
    console.log(`seed 완료: ${admin.email}`);
}

main()
    .catch((e)=> {
        console.log(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

//package.json 추가 
//    "scripts": "seed": "ts-node prisma/seed.ts"
//npm run seed
//npx prisma studio 실행하여 확인 