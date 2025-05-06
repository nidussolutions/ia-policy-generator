import { Response } from 'express';
import { PrismaClient } from '../../../generated/prisma';
import { AuthRequest } from '../../middlewares/authMiddlewares';

const prisma = new PrismaClient();

export const getInvoices = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.userId;

  try {
    const invoices = await prisma.invoice.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        stripeInvoiceId: true,
        amountDue: true,
        amountPaid: true,
        invoiceUrl: true,
        status: true,
        dueDate: true,
        createdAt: true,
      },
      take: 3,
    });

    res.status(200).json({ invoices });
  } catch (error) {
    console.error('Error during getting invoices:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
