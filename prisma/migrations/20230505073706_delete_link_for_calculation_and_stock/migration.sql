/*
  Warnings:

  - You are about to drop the column `stockId` on the `Calculation` table. All the data in the column will be lost.
  - Added the required column `ticker` to the `Calculation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Calculation" DROP CONSTRAINT "Calculation_stockId_fkey";

-- AlterTable
ALTER TABLE "Calculation" DROP COLUMN "stockId",
ADD COLUMN     "ticker" TEXT NOT NULL;
