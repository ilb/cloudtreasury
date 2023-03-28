/*
  Warnings:

  - You are about to drop the column `realtionId` on the `RelationMember` table. All the data in the column will be lost.
  - Added the required column `relationId` to the `RelationMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RelationMember" DROP CONSTRAINT "RelationMember_realtionId_fkey";

-- AlterTable
ALTER TABLE "RelationMember" DROP COLUMN "realtionId",
ADD COLUMN     "relationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "RelationMember" ADD CONSTRAINT "RelationMember_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "Relation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
