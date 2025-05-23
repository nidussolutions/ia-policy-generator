import Stripe from 'stripe';
import {Router} from 'express';
import {PrismaClient} from '../../generated/prisma';
import {AuthRequest, authMiddleware} from '../middlewares/authMiddlewares';

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET!);

router.get('/profile', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const user = await prisma.users.findUnique({where: {id: req.userId}});

        const currentPlan = await prisma.userPlans.findFirst({
            where: {userId: req.userId},
            include: {
                plan: true,
            },
        })

        if (!user) res.status(404).json({error: 'User not found'});
        const {password, ...userData} = user!;
        const data = {
            ...userData,
            plan: currentPlan?.plan || null,
        }

        res.status(200).json(data);
    } catch (error) {
        console.log('Error in user profile: ', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.put('/profile', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const {name, email} = req.body;
        const user = await prisma.users.update({
            where: {id: req.userId},
            data: {name, email},
        });

        await stripe.customers.update(
            user.stripeCustomerId!,
            {
                name: user.name,
                email: user.email,
                metadata: {
                    userId: user.id,
                    identity: user.identity.replace(/\D/g, ''),
                },
            }
        );

        if (!user) res.status(404).json({error: 'User not found'});
        const {password, ...userData} = user!;

        res.status(200).json(userData);
    } catch (error) {
        console.log('Error in user profile update: ', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;
