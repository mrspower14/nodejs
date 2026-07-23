/*
  Warnings:

  - A unique constraint covering the columns `[commentId,endPointId]` on the table `EndPointMention` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[operationId]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,endpointName,endpointCase]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,userId]` on the table `MemberMention` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,userId]` on the table `Membership` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[linkUrl]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId,userId,reactState]` on the table `Reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EndPointMention_commentId_endPointId_key" ON "EndPointMention"("commentId", "endPointId");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_operationId_key" ON "Endpoint"("operationId");

-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_projectId_endpointName_endpointCase_key" ON "Endpoint"("projectId", "endpointName", "endpointCase");

-- CreateIndex
CREATE UNIQUE INDEX "MemberMention_commentId_userId_key" ON "MemberMention"("commentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_projectId_userId_key" ON "Membership"("projectId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_linkUrl_key" ON "Project"("linkUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Reaction_commentId_userId_reactState_key" ON "Reaction"("commentId", "userId", "reactState");
