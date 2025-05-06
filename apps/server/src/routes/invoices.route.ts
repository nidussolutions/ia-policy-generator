import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { authMiddleware } from '../middlewares/authMiddlewares';
import { getInvoices } from '../controllers/private/invoices.controller';

const router = Router();

router.get('/', authMiddleware, getInvoices);

export default router;
