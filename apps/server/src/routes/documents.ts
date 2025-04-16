import { Router } from 'express';
import { PrismaClient } from '../generated/prisma';
import { AuthRequest, authMiddleware } from '../middlewares/authMiddlewares';

const router = Router();
const prisma = new PrismaClient();

router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  const { siteId, type, content } = req.body;

  try {
    const site = await prisma.site.findUnique({
      where: { id: siteId },
    });

    if (!site || site.ownerId != req.userId)
      res.status(403).json({ error: 'Access denied' });

    const doc = await prisma.document.create({
      data: { siteId, type, content },
    });

    res.status(201).json(doc);
  } catch (error) {
    console.log('Error during creating document: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    await prisma.document.deleteMany({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.log('Error during deleting document: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
