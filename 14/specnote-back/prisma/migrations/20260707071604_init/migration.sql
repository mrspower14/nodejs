/*
  Warnings:

  - You are about to drop the column `endPointId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `endPointId` on the `EndpointMention` table. All the data in the column will be lost.
  - You are about to drop the column `isRemoved` on the `Membership` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[commentId,endpointId]` on the table `EndpointMention` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endpointId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endpointId` to the `EndpointMention` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_endPointId_fkey";

-- DropForeignKey
ALTER TABLE "EndpointMention" DROP CONSTRAINT "EndpointMention_endPointId_fkey";

-- DropIndex
DROP INDEX "EndpointMention_commentId_endPointId_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "endPointId",
ADD COLUMN     "endpointId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EndpointMention" DROP COLUMN "endPointId",
ADD COLUMN     "endpointId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "isRemoved",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "EndpointMention_commentId_endpointId_key" ON "EndpointMention"("commentId", "endpointId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndpointMention" ADD CONSTRAINT "EndpointMention_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
