import {Router} from 'express';
import {PrismaClient} from '../../generated/prisma';
import {authMiddleware, AuthRequest} from "../middlewares/authMiddlewares";
import {updatePlan} from "../service/plans";

const router = Router();
const prisma = new PrismaClient();

router.put('/upgrade', authMiddleware, async (req: AuthRequest, res) => {
    const {planId} = req.body;
    const userId = req.userId;

    try {
        if(!planId) {
            res.status(400).json({message: 'Plan ID is required'});
            return
        }

        if(!userId) {
            res.status(400).json({message: 'User ID is required'});
            return
        }

        await updatePlan(userId, planId);


        res.status(200).json({message: 'Plan upgraded successfully'});
    } catch (error) {
        console.error('Error during upgrading plan:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const plans = await prisma.plans.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                name: true,
                description: true,
                type: true,
                price: true,
            },
        });


        res.status(200).json({plans});
    } catch (error) {
        console.error('Error fetching plans:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})

router.put('/:id', authMiddleware, async (req: AuthRequest, res) => {
    const {id} = req.params;
    const {name, description, price} = req.body;

    try {
        const updatedPlan = await prisma.plans.update({
            where: {id},
            data: {
                name,
                description,
                price,
            },
        });

        res.status(200).json({
            message: 'Plan updated successfully',
            plan: {
                id: updatedPlan.id,
                name: updatedPlan.name,
                description: updatedPlan.description,
                price: updatedPlan.price,
            },
        });
    } catch (error) {
        console.error('Error during updating plan:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})

router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
    const {id} = req.params;

    try {
        await prisma.plans.delete({
            where: {id},
        });

        res.status(200).json({message: 'Plan deleted successfully'});
    } catch (error) {
        console.error('Error during deleting plan:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})

export default router;