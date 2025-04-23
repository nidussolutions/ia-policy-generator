import {Router} from "express";
import {PrismaClient} from "../../generated/prisma";
import {authMiddleware, AuthRequest} from "../middlewares/authMiddlewares";

const router = Router();
const prisma = new PrismaClient();

router.get("/", authMiddleware, async (req: AuthRequest, res): Promise<any> => {
    const userId = req.userId;

    try {
        const subscriptions = await prisma.subscription.findFirst({
            where: {userId: userId},
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                status: true,
                currentPeriodEnd: true,
                cancelAtPeriodEnd: true,
            },
        });

        res.status(200).json(subscriptions);

    } catch (error) {
        console.error('Error during getting subscriptions:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})

export default router;
