/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `BusinessEntity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BusinessEntity" ADD COLUMN     "uid" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "BusinessEntity_uid_key" ON "BusinessEntity"("uid");
