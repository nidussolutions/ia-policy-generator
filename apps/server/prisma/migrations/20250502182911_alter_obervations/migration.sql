/*
  Warnings:

  - You are about to drop the column `observation` on the `Site` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Site" DROP COLUMN "observation",
ADD COLUMN     "observations" TEXT NOT NULL DEFAULT '';
