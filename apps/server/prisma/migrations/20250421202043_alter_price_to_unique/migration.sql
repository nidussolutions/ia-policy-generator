/*
  Warnings:

  - A unique constraint covering the columns `[price]` on the table `Plans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plans_price_key" ON "Plans"("price");
