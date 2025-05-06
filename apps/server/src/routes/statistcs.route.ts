import { Router } from 'express';
import { PrismaClient } from '../../generated/prisma';
import { authMiddleware } from '../middlewares/authMiddlewares';

const router = Router();
const prisma = new PrismaClient();

router.get('/metrics', authMiddleware);

router.get('/logs', authMiddleware);

export default router;
