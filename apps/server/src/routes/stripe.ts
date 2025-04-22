import Stripe from 'stripe';
import  {Router, Response} from 'express';
import {authMiddleware, AuthRequest} from "../middlewares/authMiddlewares";
import {PrismaClient} from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET!);

const endpointSecret = "whsec_e38a50e968f4d3a3024ee43b6cab8e7de9e55825bd4025b127140a072ba64061";
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
            customer_email: user.email,
            success_url: `${domain}/payment-confirmation?status=approved&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domain}/payment-confirmation?status=cancelled`,
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

router.post('/create-portal-session', async (req, res) => {
    const {session_id} = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    const returnUrl = domain || 'http://localhost:3000';

    const portalSession = await stripe.billingPortal.sessions.create({
        customer: checkoutSession.customer as string,
        return_url: returnUrl,
    });

    res.redirect(303, portalSession.url);
});


export default router;