-- CreateTable
CREATE TABLE "Calculation" (
    "id" SERIAL NOT NULL,
    "stockId" INTEGER NOT NULL,
    "AssessmentDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ActiveMarket" TEXT NOT NULL,
    "FairValue" INTEGER NOT NULL,
    "DaysNumbers" INTEGER NOT NULL,
    "TransactionsNumbers" INTEGER NOT NULL,
    "OutputVolume" INTEGER NOT NULL,
    "TotalVolume" INTEGER NOT NULL,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Calculation" ADD CONSTRAINT "Calculation_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
