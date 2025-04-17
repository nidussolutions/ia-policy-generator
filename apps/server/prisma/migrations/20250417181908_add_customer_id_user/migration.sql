/*
  Warnings:

  - A unique constraint covering the columns `[custumerId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "custumerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_custumerId_key" ON "Users"("custumerId");
