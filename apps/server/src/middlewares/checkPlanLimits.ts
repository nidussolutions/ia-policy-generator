import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export const checkPlanLimits = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
  const userId = (req as any).userId;

  try {
    const userWithPlan = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        userPlans: {
          orderBy: { createdAt: 'desc' },
          include: { plan: true },
        },
      },
    });

    if (!userWithPlan) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const currentPlan = userWithPlan.userPlans[0].plan;

    const siteCount = await prisma.site.count({
      where: { ownerId: userId },
    });

    if (currentPlan.name.toLowerCase() === 'free' && siteCount >= 1) {
      res.status(403).json({ error: 'Free plan allows only 1 site' });
      return;
    }

    if (currentPlan.name.toLowerCase() === 'pro' && siteCount >= 10) {
      res.status(403).json({ error: 'Pro plan allows up to 10 sites' });
      return;
    }

    next();
  } catch (error) {
    console.error('Error checking plan limits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
