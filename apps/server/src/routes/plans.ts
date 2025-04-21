import {Router} from 'express';
import {PrismaClient} from '../../generated/prisma';
import {authMiddleware, AuthRequest} from "../middlewares/authMiddlewares";

const router = Router();
const prisma = new PrismaClient();


router.post('/', authMiddleware, async (req: AuthRequest, res) => {
    const {name, description, price} = req.body;

    try {
        const existingPlan = await prisma.plans.findUnique({
            where: {price},
        });

        if (existingPlan) {
            res.status(400).json({message: 'Plan already exists'});
            return
        }

        const newPlan = await prisma.plans.create({
            data: {
                name,
                description,
                price,
            },
        });

        res.status(201).json({
            message: 'Plan created successfully',
            plan: {
                id: newPlan.id,
                name: newPlan.name,
                description: newPlan.description,
                price: newPlan.price,
            },
        });
    } catch (error) {
        console.error('Error during creating plan:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})

router.put('/upgrade', authMiddleware, async (req: AuthRequest, res) => {
    const {planId} = req.body;

    try {
        const userPlan = await prisma.userPlans.findUnique({
            where: {userId: req.userId},
        });

        if (!userPlan) {
            res.status(404).json({message: 'User plan not found'});
            return
        }

        await prisma.userPlans.update({
            where: {userId: req.userId},
            data: {
                planId,
            },
        });

        res.status(200).json({message: 'Plan upgraded successfully'});
    } catch (error) {
        console.error('Error during upgrading plan:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
    try {
        const plans = await prisma.plans.findMany();
        res.status(200).json(plans);
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