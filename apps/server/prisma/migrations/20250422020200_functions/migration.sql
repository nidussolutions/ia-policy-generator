/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_subscriptionId_fkey";

-- DropIndex
DROP INDEX "Users_subscriptionId_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "subscriptionId";

-- DropTable
DROP TABLE "subscriptions";
