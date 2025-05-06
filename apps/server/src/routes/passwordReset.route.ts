import { Router } from 'express';
import bcrypt from 'bcryptjs';
import {
  forgotPassword,
  resetPassword,
} from '../controllers/public/passwordReset.controller';

const router = Router();

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

export default router;
