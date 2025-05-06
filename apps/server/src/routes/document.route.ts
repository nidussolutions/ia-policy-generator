import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddlewares';
import {
  editDoc,
  getDocBySiteId,
  viewDocById,
  deleteDoc,
} from '../controllers/private/documents.controller';

const router = Router();

router.get('/:siteId', authMiddleware, getDocBySiteId);

router.get('/view/:id', authMiddleware, viewDocById);

router.put('/:id', authMiddleware, editDoc);

router.delete('/:id', authMiddleware, deleteDoc);

export default router;
