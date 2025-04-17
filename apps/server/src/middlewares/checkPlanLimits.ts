import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const checkPlanLimits = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = (req as any).userId;

  try {
    const user = await prisma.users.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    const siteCount = await prisma.site.count({ where: { ownerId: userId } });

    if (user.plan === 'free' && siteCount >= 1) {
      res
        .status(403)
        .json({ error: 'Limite de 1 site atingido no plano gratuito' });
      return;
    }

    if (user.plan === 'pro' && siteCount >= 10) {
      res
        .status(403)
        .json({ error: 'Limite de 10 sites atingido no plano Pro' });
      return;
    }

    next();
  } catch (error) {
    console.error('Erro ao verificar limites do plano:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
};
