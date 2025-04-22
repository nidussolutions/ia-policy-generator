/*
  Warnings:

  - A unique constraint covering the columns `[subscriptionId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "subscriptionId" TEXT;

-- CreateTable
CREATE TABLE "subscriptions" (
    "stripe_id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "canceledAt" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL,
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("stripe_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_subscriptionId_key" ON "Users"("subscriptionId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("stripe_id") ON DELETE SET NULL ON UPDATE CASCADE;
