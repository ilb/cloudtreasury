/*
  Warnings:

  - You are about to drop the column `roleId` on the `Relation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Relation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[businessEntityId]` on the table `Relation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `BusinessEntity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Relation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('ORG');

-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_businessEntityId_fkey";

-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Relation" DROP CONSTRAINT "Relation_userId_fkey";

-- AlterTable
ALTER TABLE "BusinessEntity" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Relation" DROP COLUMN "roleId",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" "RelationType" NOT NULL DEFAULT E'ORG',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "businessEntityId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "RelationMember" (
    "id" SERIAL NOT NULL,
    "realtionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelationMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Relation_businessEntityId_key" ON "Relation"("businessEntityId");

-- AddForeignKey
ALTER TABLE "Relation" ADD CONSTRAINT "Relation_businessEntityId_fkey" FOREIGN KEY ("businessEntityId") REFERENCES "BusinessEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationMember" ADD CONSTRAINT "RelationMember_realtionId_fkey" FOREIGN KEY ("realtionId") REFERENCES "Relation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationMember" ADD CONSTRAINT "RelationMember_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationMember" ADD CONSTRAINT "RelationMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
