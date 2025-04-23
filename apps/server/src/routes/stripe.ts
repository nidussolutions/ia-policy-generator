import Stripe from 'stripe';
import  {Router, Response} from 'express';
import {authMiddleware, AuthRequest} from "../middlewares/authMiddlewares";
import {PrismaClient} from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET!);

const domain = process.env.DOMAIN || 'http://localhost:3000';

router.post('/create-checkout-session', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.userId

    const user = await prisma.users.findUnique({
        where: {id: userId},
    })

    if (!user) {
        res.status(400).json({message: 'Usuário não encontrado'});
        return;
    }

    const plan = await prisma.plans.findUnique({
        where: {name: "Pro"},
    })

    if (!plan) {
        res.status(400).json({message: 'Plano não encontrado'});
        return;
    }

    try {
        const sessions = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: plan.price,
                    quantity: 1,

                },
            ],
            mode: 'subscription',
            customer: user.stripeCustomerId!,
            success_url: `${domain}/payment-confirmation/approved/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${domain}/payment-confirmation/cancelled/{CHECKOUT_SESSION_ID}`,
        })

        res.status(200).json({
            sessionId: sessions.id,
            url: sessions.url,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao criar sessão de checkout'});
    }
});

router.post('/cancel-subscription', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.userId

    const user = await prisma.users.findUnique({
        where: {id: userId},
    })

    if (!user) {
        res.status(400).json({message: 'Usuário não encontrado'});
        return;
    }

    try {
        const subscriptions = await stripe.subscriptions.list({
            customer: user.stripeCustomerId!,
            status: 'active',
        });

        if (subscriptions.data.length === 0) {
            res.status(400).json({message: 'Assinatura não encontrada'});
            return;
        }

        const subscription = subscriptions.data[0];

        await stripe.subscriptions.cancel(
            subscription.id,
            {
                prorate: true,
            }
        );

        res.status(200).json({message: 'Assinatura cancelada com sucesso'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao cancelar assinatura'});
    }
})

router.post('/create-portal-session', async (req, res) => {
    const {session_id} = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    const returnUrl = domain || process.env.DOMAIN;

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer as string,
        return_url: returnUrl,
    });

    res.redirect(303, portalSession.url);
});


export default router;