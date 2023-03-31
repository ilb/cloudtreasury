/*
  Warnings:

  - The primary key for the `Stocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stock_id` on the `Stocks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stocks" DROP CONSTRAINT "Stocks_pkey",
DROP COLUMN "stock_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id");
