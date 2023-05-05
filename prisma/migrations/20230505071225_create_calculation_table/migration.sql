-- CreateTable
CREATE TABLE "Calculation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "date" TEXT NOT NULL,
    "stockId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Calculation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Calculation" ADD CONSTRAINT "Calculation_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
