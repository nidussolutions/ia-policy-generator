import { Response, NextFunction } from 'express';
import { PrismaClient } from '../generated/prisma';
import { AuthRequest } from './authMiddlewares';

const prisma = new PrismaClient();

export const checkDocumentLimit = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId!;
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: { documents: true },
    });

    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado.' });
      return;
    }

    const documentCount = user.documents.length;

    if (user.plan === 'free' && documentCount >= 1) {
      res.status(403).json({
        error:
          'Limite de documentos atingido no plano gratuito. Atualize para o plano Pro para criar mais documentos.',
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Erro no middleware de verificação de documentos:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
    return;
  }
};
