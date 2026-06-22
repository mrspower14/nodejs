-- AlterTable
ALTER TABLE "BookRental" ALTER COLUMN "returnDt" SET DEFAULT '',
ALTER COLUMN "extCnt" SET DEFAULT 0,
ALTER COLUMN "reservId" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "BookReservation" ALTER COLUMN "reservDt" SET DEFAULT '',
ALTER COLUMN "rentId" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "rentAvailDt" SET DEFAULT '';
