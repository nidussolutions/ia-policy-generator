/*
  Warnings:

  - Added the required column `updatedAt` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "usersId" TEXT;

-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "lastLogin" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "plan" TEXT NOT NULL DEFAULT 'free';

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
