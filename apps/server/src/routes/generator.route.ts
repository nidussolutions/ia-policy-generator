import {Router, Response} from 'express';
import {generateAiDocument} from '../service/iaService';
import {AuthRequest, authMiddleware} from '../middlewares/authMiddlewares';
import {PrismaClient} from '../../generated/prisma';
import {checkDocumentLimit} from '../middlewares/checkDocumentLimit';

const router = Router();
const prisma = new PrismaClient();

router.post(
    '/',
    authMiddleware,
    checkDocumentLimit,
    
);

export default router;
