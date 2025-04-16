import { Router } from 'express';
import { PrismaClient } from '../generated/prisma';
import { AuthRequest, authMiddleware } from '../middlewares/authMiddlewares';

const router = Router();
const prisma = new PrismaClient();

router.get('/profile', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.users.findUnique({ where: { id: req.userId } });

    if (!user) res.status(404).json({ error: 'User not found' });
    const { password, ...userData } = user!;

    res.status(200).json(userData);
  } catch (error) {
    console.log('Error in user profile: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
