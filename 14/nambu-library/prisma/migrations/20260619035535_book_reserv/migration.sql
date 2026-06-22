/*
  Warnings:

  - You are about to drop the column `reservId` on the `BookRental` table. All the data in the column will be lost.
  - You are about to drop the column `rentId` on the `BookReservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookRental" DROP CONSTRAINT "BookRental_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookRental" DROP CONSTRAINT "BookRental_memId_fkey";

-- DropForeignKey
ALTER TABLE "BookRental" DROP CONSTRAINT "BookRental_reservId_fkey";

-- DropForeignKey
ALTER TABLE "BookReservation" DROP CONSTRAINT "BookReservation_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookReservation" DROP CONSTRAINT "BookReservation_memId_fkey";

-- AlterTable
ALTER TABLE "BookRental" DROP COLUMN "reservId";

-- AlterTable
ALTER TABLE "BookReservation" DROP COLUMN "rentId";

-- AddForeignKey
ALTER TABLE "BookRental" ADD CONSTRAINT "BookRental_memId_fkey" FOREIGN KEY ("memId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookRental" ADD CONSTRAINT "BookRental_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BookInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReservation" ADD CONSTRAINT "BookReservation_memId_fkey" FOREIGN KEY ("memId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookReservation" ADD CONSTRAINT "BookReservation_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "BookInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
