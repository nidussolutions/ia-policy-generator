import {Router} from "express";
import {PrismaClient} from "../../generated/prisma";
import {authMiddleware, AuthRequest} from "../middlewares/authMiddlewares";

const router = Router();
const prisma = new PrismaClient();

router.get("/", authMiddleware, async (req: AuthRequest, res): Promise<any> => {
    const userId = req.userId;

    try {
        const invoices = await prisma.invoice.findMany({
            where: {userId: userId},
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                stripeInvoiceId: true,
                amountDue: true,
                amountPaid: true,
                status: true,
                dueDate: true,
                createdAt: true,
            }
        });

        res.status(200).json({invoices});

    } catch (error) {
        console.error('Error during getting invoices:', error);
        res.status(500).json({message: 'Internal server error'});
    }
})

export default router;