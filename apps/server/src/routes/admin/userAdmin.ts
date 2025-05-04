import {Router, Response} from 'express';
import {PrismaClient} from '../../../generated/prisma';
import Stripe from 'stripe';
import {adminAuthMiddleware, AdminAuthRequest} from '../../middlewares/adminAuthMiddleware';
import user from "../user";

const router = Router();
const prisma = new PrismaClient();

router.get('/', adminAuthMiddleware, async (_req: AdminAuthRequest, res: Response) => {
    try {
        // Get all users from the local database
        const users = await prisma.users.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                stripeCustomerId: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        if (!users) {
            res.status(404).json({message: 'No users found'});
            return
        }

        // Get all plans from prisma
        const currentPlan = await prisma.userPlans.findMany({
            where: {
                userId: {
                    in: users.map(user => user.id)
                }
            },
            include: {
                plan: true,
            },
        })

        // Get all subscriptions from prisma
        const currentSubscription = await prisma.subscription.findMany({
            where: {
                userId: {
                    in: users.map(user => user.id)
                }
            },
        })

        // Map users with their subscriptions and status
        const usersWithPlans = users.map(user => {
            const userPlan = currentPlan.find(plan => plan.userId === user.id);
            const userSubscription = currentSubscription.find(subscription => subscription.userId === user.id);
            return {
                ...user,
                plan: userPlan ? {
                    id: userPlan.plan.id,
                    name: userPlan.plan.name,
                    description: userPlan.plan.description,
                    price: userPlan.plan.price,
                } : null,
                subscription: userSubscription ? {
                    id: userSubscription.id,
                    status: userSubscription.status,
                    startDate: userSubscription.currentPeriodStart,
                    endDate: userSubscription.currentPeriodEnd,
                } : null
            }
        });


        res.status(200).json(usersWithPlans);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

export default router;