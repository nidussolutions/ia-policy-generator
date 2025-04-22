import Stripe from 'stripe';
import express, {Router} from 'express';
import {PrismaClient} from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET!);

const endpointSecret = "whsec_e38a50e968f4d3a3024ee43b6cab8e7de9e55825bd4025b127140a072ba64061";

router.post('/webhook', express.raw({type: 'application/json'}), async (req: express.Request, res: express.Response): Promise<void> => {
    const sig = req.headers['stripe-signature'] || '';

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
        console.error('Erro ao verificar webhook Stripe:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;

            try {
                const email = session.customer_email;
                if (!email) {
                    throw new Error('Email do cliente não encontrado na sessão');
                }

                const user = await prisma.users.findUnique({where: {email}});
                if (!user) {
                    throw new Error(`Usuário com email ${email} não encontrado`);
                }

                const plan = await prisma.plans.findUnique({where: {name: "Pro"}});
                if (!plan) {
                    throw new Error('Plano Pro não encontrado');
                }

                await prisma.userPlans.update({
                    where: {userId: user.id},
                    data: {
                        planId: plan.id,
                    },
                });

                console.log(`Usuário ${email} atualizado para o plano Pro com sucesso.`);
            } catch (err: any) {
                console.error('Erro ao processar checkout.session.completed:', err.message);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send();
});

export default router;