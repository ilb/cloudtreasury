/*
  Warnings:

  - A unique constraint covering the columns `[date,ticker]` on the table `Calculation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Calculation_date_ticker_key" ON "Calculation"("date", "ticker");
