/*
  Warnings:

  - Made the column `stripeCustomerId` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "invoiceUrl" TEXT;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "stripeCustomerId" SET NOT NULL;
