import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { authMiddleware, AuthRequest } from '../middlewares/authMiddlewares';
import { checkPlanLimits } from '../middlewares/checkPlanLimits';

const router = Router();
const prisma = new PrismaClient();

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const sites = await prisma.site.findMany({
      where: { ownerId: req.userId! },
    });
    res.json(sites);
  } catch (error) {
    console.log('Error during fetching sites: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post(
  '/',
  authMiddleware,
  checkPlanLimits,
  async (req: AuthRequest, res) => {
    const { domain, language, legislation, name } = req.body;

    try {
      const site = await prisma.site.create({
        data: {
          name,
          domain,
          language,
          legislation,
          ownerId: req.userId!,
        },
      });

      await prisma.activityLog.create({
        data: {
          userId: req.userId!,
          action: `Criou o site "${site.name}"`,
        },
      });

      res.status(201).json(site);
    } catch (error) {
      console.log('Error during creating site: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    const site = await prisma.site.findUnique({ where: { id } });

    if (!site) {
      res.status(404).json({ error: 'Site not found' });
    }

    await prisma.document.deleteMany({ where: { siteId: id } });
    await prisma.site.delete({ where: { id } });

    await prisma.activityLog.create({
      data: {
        userId: req.userId!,
        action: `Removeu o site "${site!.name}"`,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.log('Error during deleting site: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
