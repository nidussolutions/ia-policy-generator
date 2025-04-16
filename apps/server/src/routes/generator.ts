import { Router } from 'express';
import { generateAiDocument } from '../service/iaService';
import { AuthRequest, authMiddleware } from '../middlewares/authMiddlewares';
import { PrismaClient } from '../generated/prisma';

const router = Router();
const prisma = new PrismaClient();

router.post('/', authMiddleware, async (req: AuthRequest, res) => {
  const { siteId, type } = req.body;

  try {
    const site = await prisma.site.findUnique({
      where: { id: siteId },
    });

    if (!site || site.ownerId != req.userId)
      res.status(403).json({ error: 'Access denied' });

    const content = await generateAiDocument({
      type,
      domain: site!.domain,
      legislation: site!.legislation,
      language: site!.language,
    });

    const doc = await prisma.document.create({
      data: { siteId, type, content },
    });

    await prisma.users.update({
      where: { id: req.userId! },
      data: { documents: { connect: { id: doc.id } } },
    });

    await prisma.activityLog.create({
      data: {
        userId: req.userId!,
        action: `Criou o documento "${doc.type}" do site "${site!.name}"`,
      },
    });

    res.status(201).json(doc);
  } catch (error) {
    console.log('Error during creating document: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
