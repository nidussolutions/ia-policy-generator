import { Router } from 'express';
import { publicId } from '../controllers/public/public.controller';

const router = Router();

router.get('/:publicId', publicId);

export default router;
