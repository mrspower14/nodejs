-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('NORMAL', 'WITHDRAWAL');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('NORMAL', 'DISPOSED');

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "telNo" TEXT NOT NULL,
    "memStatus" "MemberStatus" NOT NULL DEFAULT 'NORMAL',
    "rentalAvailYn" BOOLEAN NOT NULL DEFAULT true,
    "rentalAvailDt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookInfo" (
    "id" SERIAL NOT NULL,
    "bookIsbn" TEXT NOT NULL,
    "bookNm" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "bookStatus" "BookStatus" NOT NULL DEFAULT 'NORMAL',
    "rentYn" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookRental" (
    "id" SERIAL NOT NULL,
    "memId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "rentDt" TEXT NOT NULL,
    "dueDt" TEXT NOT NULL,
    "returnDt" TEXT NOT NULL,
    "extCnt" INTEGER NOT NULL,
    "returnYn" BOOLEAN NOT NULL DEFAULT false,
    "reservId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookRental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookReservation" (
    "id" SERIAL NOT NULL,
    "memId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "reservDt" TEXT NOT NULL,
    "rentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookReservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BookInfo_bookIsbn_key" ON "BookInfo"("bookIsbn");

-- CreateIndex
CREATE UNIQUE INDEX "BookRental_memId_bookId_rentDt_key" ON "BookRental"("memId", "bookId", "rentDt");

-- CreateIndex
CREATE UNIQUE INDEX "BookReservation_memId_bookId_reservDt_key" ON "BookReservation"("memId", "bookId", "reservDt");

-- AddForeignKey
ALTER TABLE "BookRental" ADD CONSTRAINT "BookRental_memId_fkey" FOREIGN KEY ("memId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookRental" ADD CONSTRAINT "BookRental_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BookInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookRental" ADD CONSTRAINT "BookRental_reservId_fkey" FOREIGN KEY ("reservId") REFERENCES "BookReservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReservation" ADD CONSTRAINT "BookReservation_memId_fkey" FOREIGN KEY ("memId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReservation" ADD CONSTRAINT "BookReservation_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BookInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
