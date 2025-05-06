import { Response } from 'express';
import { PrismaClient } from '../../../generated/prisma';
import { AuthRequest } from '../../middlewares/authMiddlewares';

const prisma = new PrismaClient();

export const getDocBySiteId = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  const { siteId } = req.params;

  try {
    const site = await prisma.site.findUnique({
      where: { id: siteId },
    });

    if (!site || site.ownerId != req.userId)
      res.status(403).json({ error: 'Access denied' });

    const doc = await prisma.document.findMany({
      where: { siteId },
      orderBy: { updatedAt: 'desc' },
    });

    res.status(201).json(doc);
  } catch (error) {
    console.log('Error during creating document: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const viewDocById = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const doc = await prisma.document.findUnique({
      where: { id },
      include: { site: true },
    });

    if (!doc || doc.site.ownerId != req.userId) {
      res.status(403).json({ error: 'Access denied' });
    }

    await prisma.activityLog.create({
      data: {
        userId: req.userId!,
        action: `Visualizou o documento "${doc!.type}" do site "${doc!.site.name}"`,
      },
    });

    res.status(200).json(doc);
  } catch (error) {
    console.log('Error during creating document: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const editDoc = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const doc = await prisma.document.findUnique({
      where: { id },
      include: { site: true },
    });

    if (!doc || doc.site.ownerId != req.userId) {
      res.status(403).json({ error: 'Access denied' });
    }

    const newDoc = await prisma.document.update({
      where: { id },
      data: { content, updatedAt: new Date() },
    });

    await prisma.activityLog.create({
      data: {
        userId: req.userId!,
        action: `Atualizou o documento "${doc!.type}" do site "${doc!.site.name}"`,
      },
    });

    res.status(200).json(newDoc);
  } catch (error) {
    console.log('Error during creating document: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteDoc = async (
  req: AuthRequest,
  res: Response
): Promise<any> => {
  const { id } = req.params;

  try {
    const doc = await prisma.document.findUnique({
      where: { id },
      include: { site: true },
    });

    if (!doc || doc.site.ownerId != req.userId) {
      res.status(403).json({ error: 'Access denied' });
    }

    await prisma.document.delete({ where: { id } });

    await prisma.activityLog.create({
      data: {
        userId: req.userId!,
        action: `Removeu o documento "${doc!.type}" do site "${doc!.site.name}"`,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.log('Error during deleting document: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
