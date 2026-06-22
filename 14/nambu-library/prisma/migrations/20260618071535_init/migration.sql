/*
  Warnings:

  - You are about to drop the column `rentalAvailDt` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `rentalAvailYn` on the `Member` table. All the data in the column will be lost.
  - Added the required column `rentAvailDt` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "rentalAvailDt",
DROP COLUMN "rentalAvailYn",
ADD COLUMN     "rentAvailDt" TEXT NOT NULL,
ADD COLUMN     "rentAvailYn" BOOLEAN NOT NULL DEFAULT true;
