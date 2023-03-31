/*
  Warnings:

  - You are about to drop the `Stocks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Stocks";

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "isin" TEXT,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);
