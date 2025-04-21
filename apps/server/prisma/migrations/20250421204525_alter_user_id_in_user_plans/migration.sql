/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserPlans` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserPlans_userId_key" ON "UserPlans"("userId");
