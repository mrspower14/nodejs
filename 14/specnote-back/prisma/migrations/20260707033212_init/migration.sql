/*
  Warnings:

  - You are about to drop the column `context` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `endpointCase` on the `Endpoint` table. All the data in the column will be lost.
  - You are about to drop the column `endpointJson` on the `Endpoint` table. All the data in the column will be lost.
  - You are about to drop the column `endpointName` on the `Endpoint` table. All the data in the column will be lost.
  - You are about to drop the column `tagName` on the `Endpoint` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `MemberMention` table. All the data in the column will be lost.
  - You are about to drop the column `memState` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Membership` table. All the data in the column will be lost.
  - You are about to drop the column `commentId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `invitedId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `mentionId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `isCompleted` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `linkJsonUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `linkUrl` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `projectTitle` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `reactState` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the `EndPointMention` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectJson` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[projectId,path,method]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,mentionedUserId]` on the table `MemberMention` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,userId,type]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `Endpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operationJson` to the `Endpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Endpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentionedUserId` to the `MemberMention` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oasVersion` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specJsonUrl` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `version` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `type` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "REACTION_TYPE" AS ENUM ('DONE', 'CHECKING', 'BEST', 'ACK');

-- CreateEnum
CREATE TYPE "NOTIFICATION_TYPE" AS ENUM ('INVITED', 'MENTIONED');

-- DropForeignKey
ALTER TABLE "EndPointMention" DROP CONSTRAINT "EndPointMention_commentId_fkey";

-- DropForeignKey
ALTER TABLE "EndPointMention" DROP CONSTRAINT "EndPointMention_endPointId_fkey";

-- DropForeignKey
ALTER TABLE "EndPointMention" DROP CONSTRAINT "EndPointMention_projectId_fkey";

-- DropForeignKey
ALTER TABLE "MemberMention" DROP CONSTRAINT "MemberMention_userId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_invitedId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_mentionId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectJson" DROP CONSTRAINT "ProjectJson_projectId_fkey";

-- DropIndex
DROP INDEX "Endpoint_operationId_key";

-- DropIndex
DROP INDEX "Endpoint_projectId_endpointName_endpointCase_key";

-- DropIndex
DROP INDEX "MemberMention_commentId_userId_key";

-- DropIndex
DROP INDEX "Project_linkUrl_key";

-- DropIndex
DROP INDEX "Reaction_commentId_userId_reactState_key";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "context",
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Endpoint" DROP COLUMN "endpointCase",
DROP COLUMN "endpointJson",
DROP COLUMN "endpointName",
DROP COLUMN "tagName",
ADD COLUMN     "method" TEXT NOT NULL,
ADD COLUMN     "operationJson" JSONB NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "operationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MemberMention" DROP COLUMN "userId",
ADD COLUMN     "mentionedUserId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "memState",
DROP COLUMN "updatedAt",
ADD COLUMN     "isRemoved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "commentId",
DROP COLUMN "invitedId",
DROP COLUMN "mentionId",
DROP COLUMN "userId",
ADD COLUMN     "invitedProjectId" INTEGER,
ADD COLUMN     "mentionedCommentId" INTEGER,
ADD COLUMN     "recipientId" INTEGER NOT NULL,
ADD COLUMN     "type" "NOTIFICATION_TYPE" NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "isCompleted",
DROP COLUMN "linkJsonUrl",
DROP COLUMN "linkUrl",
DROP COLUMN "projectTitle",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "oasVersion" TEXT NOT NULL,
ADD COLUMN     "specJsonUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "tryItBaseUrl" TEXT,
ALTER COLUMN "version" SET NOT NULL;

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "reactState",
ADD COLUMN     "type" "REACTION_TYPE" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isAi" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "EndPointMention";

-- DropTable
DROP TABLE "ProjectJson";

-- DropEnum
DROP TYPE "REACTSTATE";

-- CreateTable
CREATE TABLE "SpecSnapshot" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "rawJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpecSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EndpointMention" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,
    "endPointId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EndpointMention_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EndpointMention_commentId_endPointId_key" ON "EndpointMention"("commentId", "endPointId");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_projectId_path_method_key" ON "Endpoint"("projectId", "path", "method");

-- CreateIndex
CREATE UNIQUE INDEX "MemberMention_commentId_mentionedUserId_key" ON "MemberMention"("commentId", "mentionedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_commentId_userId_type_key" ON "Reaction"("commentId", "userId", "type");

-- AddForeignKey
ALTER TABLE "SpecSnapshot" ADD CONSTRAINT "SpecSnapshot_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberMention" ADD CONSTRAINT "MemberMention_mentionedUserId_fkey" FOREIGN KEY ("mentionedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_mentionedCommentId_fkey" FOREIGN KEY ("mentionedCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_invitedProjectId_fkey" FOREIGN KEY ("invitedProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndpointMention" ADD CONSTRAINT "EndpointMention_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndpointMention" ADD CONSTRAINT "EndpointMention_endPointId_fkey" FOREIGN KEY ("endPointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndpointMention" ADD CONSTRAINT "EndpointMention_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
