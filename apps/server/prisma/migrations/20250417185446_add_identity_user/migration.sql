/*
  Warnings:

  - A unique constraint covering the columns `[identity]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "identity" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_identity_key" ON "Users"("identity");
