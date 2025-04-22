-- AlterTable
ALTER TABLE "UserPlans" ADD COLUMN     "downgradeScheduledAt" TIMESTAMP(3),
ADD COLUMN     "downgradeToPlanId" TEXT;

-- AddForeignKey
ALTER TABLE "UserPlans" ADD CONSTRAINT "UserPlans_downgradeToPlanId_fkey" FOREIGN KEY ("downgradeToPlanId") REFERENCES "Plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
