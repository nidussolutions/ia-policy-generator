import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddlewares';
import {
  getLogs,
  getMetrics,
} from '../controllers/private/statistcs.controller';

const router = Router();

router.get('/metrics', authMiddleware, getMetrics);

router.get('/logs', authMiddleware, getLogs);

export default router;
