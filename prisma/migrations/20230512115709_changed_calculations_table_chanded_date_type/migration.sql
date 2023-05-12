/*
  Warnings:

  - Changed the type of `date` on the `Calculation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Calculation" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Calculation_date_ticker_key" ON "Calculation"("date", "ticker");
