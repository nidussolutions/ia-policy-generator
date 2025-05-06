import { Request, Response } from 'express';
import { PrismaClient } from '../../../generated/prisma';
const prisma = new PrismaClient();

export const publicId = async (req: Request, res: Response) => {
  const { publicId } = req.params;

  try {
    const document = await prisma.document.findUnique({
      where: { publicId },
      select: {
        title: true,
        content: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!document) {
      res.status(404).json({ message: 'Documento não encontrado' });
    }

    res.json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao carregar documento público' });
  }
};
