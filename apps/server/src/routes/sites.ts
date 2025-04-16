import { Router } from 'express';
import { PrismaClient } from '../generated/prisma';
import { authMiddleware, AuthRequest } from '../middlewares/authMiddlewares';

const router = Router();
const prisma = new PrismaClient();

router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  const { domain, language, legislation } = req.body;

  try {
    const site = await prisma.site.create({
      data: {
        domain,
        language,
        legislation,
        ownerId: req.userId!,
      },
    });

    res.status(201).json(site);
  } catch (error) {
    console.log('Error during creating site: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    await prisma.document.deleteMany({ where: { siteId: id } });
    await prisma.site.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.log('Error during deleting site: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
