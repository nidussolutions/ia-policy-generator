import {Router} from "express";
import {PrismaClient} from "../../generated/prisma";
import {authMiddleware, AuthRequest} from "../middlewares/authMiddlewares";

const router = Router();
const prisma = new PrismaClient();

router.get("/", authMiddleware, async (req: AuthRequest, res): Promise<any> => {
    const userId = req.userId;
    const {limit = "5", page = "1"} = req.query;

    const take = parseInt(limit as string);
    const skip = (parseInt(page as string) - 1) * take;

    try {
        const [invoices, totalCount] = await Promise.all([
            prisma.invoice.findMany({
                where: {userId},
                orderBy: {createdAt: 'desc'},
                select: {
                    id: true,
                    stripeInvoiceId: true,
                    amountDue: true,
                    amountPaid: true,
                    invoiceUrl: true,
                    status: true,
                    dueDate: true,
                    createdAt: true,
                },
                take,
                skip,
            }),
            prisma.invoice.count({where: {userId}})
        ]);

        res.status(200).json({
            invoices,
            pagination: {
                total: totalCount,
                page: parseInt(page as string),
                limit: take,
                totalPages: Math.ceil(totalCount / take),
            }
        });

    } catch (error) {
        console.error('Error during getting invoices:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

export default router;