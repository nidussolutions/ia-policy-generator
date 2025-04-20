import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { authMiddleware, AuthRequest } from '../middlewares/authMiddlewares';

const router = Router();
const prisma = new PrismaClient();

router.get('/metrics', authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;

  try {
    const [siteCount, docCount] = await Promise.all([
      prisma.site.count({ where: { ownerId: userId } }),
      prisma.document.count({ where: { usersId: userId } }),
    ]);

    res.json({
      sites: siteCount,
      documentos: docCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar métricas do dashboard' });
  }
});

router.get('/logs', authMiddleware, async (req: AuthRequest, res) => {
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
});

export default router;
