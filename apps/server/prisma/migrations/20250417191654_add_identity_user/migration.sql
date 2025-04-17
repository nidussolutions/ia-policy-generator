/*
  Warnings:

  - You are about to drop the column `custumerId` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Users_custumerId_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "custumerId",
ADD COLUMN     "customerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_customerId_key" ON "Users"("customerId");
