import { Router, Response } from 'express';
import { generateAiDocument } from '../service/iaService';
import { AuthRequest, authMiddleware } from '../middlewares/authMiddlewares';
import { PrismaClient } from '../../generated/prisma';
import { checkDocumentLimit } from '../middlewares/checkDocumentLimit';
import { crawlSite } from '../service/crawlSite';

const router = Router();
const prisma = new PrismaClient();

router.post(
  '/',
  authMiddleware,
  checkDocumentLimit,
  async (req: AuthRequest, res: Response): Promise<void> => {
    const { siteId, type, title, observations = '' } = req.body;

    if (!title) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    if (!type) {
      res.status(400).json({ error: 'Type is required' });
      return;
    }
    if (!siteId) {
      res.status(400).json({ error: 'Site ID is required' });
      return;
    }

    try {
      const site = await prisma.site.findUnique({ where: { id: siteId } });
      if (!site || site.ownerId !== req.userId) {
        res.status(403).json({ error: 'Access denied' });
        return;
      }

      const user = await prisma.users.findUnique({
        where: { id: req.userId! },
      });

      const content = await generateAiDocument({
        type,
        domain: site.domain,
        legislation: site.legislation,
        language: site.language,
        observations,
        plan: user?.plan || 'free',
        crawl: await crawlSite(site.domain),
      });

      const doc = await prisma.document.create({
        data: { siteId, type, content, title },
      });

      await prisma.users.update({
        where: { id: req.userId! },
        data: {
          documents: {
            connect: { id: doc.id },
          },
        },
      });

      await prisma.activityLog.create({
        data: {
          userId: req.userId!,
          action: `Criou o documento "${doc.type}" do site "${site.name}"`,
        },
      });

      res.status(201).json(doc);
    } catch (error) {
      console.error('Error during creating document: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
