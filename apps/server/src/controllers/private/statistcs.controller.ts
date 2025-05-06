import { Response } from 'express';
import { AuthRequest } from '../../middlewares/authMiddlewares';
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export const getMetrics = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  const userId = req.userId;

  try {
    const [siteCount, docCount] = await Promise.all([
      prisma.site.count({ where: { ownerId: userId } }),
      prisma.document.count({ where: { usersId: userId } }),
    ]);

    res.json({
      sites: siteCount,
      documents: docCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar métricas do dashboard' });
  }
};

export const getLogs = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  const userId = req.userId;

  try {
    const logs = await prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    res.json({
      logs: logs.map(
        (log) =>
          `${log.action} em ${new Date(log.createdAt).toLocaleString('pt-BR')}`
      ),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar logs do usuário' });
  }
};
