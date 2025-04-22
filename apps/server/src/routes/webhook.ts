import Stripe from 'stripe';
import express, {Router} from 'express';
import {PrismaClient} from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET!);

const endpointSecret = process.env.STRIPE_HOOK as string;

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
                    console.error('Email do cliente não encontrado na sessão');
                    return
                }

                const user = await prisma.users.findUnique({where: {email}});
                if (!user) {
                    console.error("Usuário com email ${email} não encontrado");
                    return
                }

                const plan = await prisma.plans.findUnique({where: {name: "Pro"}});
                if (!plan) {
                    console.error('Plano Pro não encontrado');
                    return
                }

                await prisma.userPlans.update({
                    where: {userId: user.id},
                    data: {
                        planId: plan.id,
                    },
                });

                const {data} = await stripe.customers.list({
                    limit: 1,
                    email,
                })

                if (!data.length) {
                    res.status(400).json({message: 'Cliente não encontrado'});
                    return;
                }

                await prisma.users.update({
                    where: {id: user.id},
                    data: {
                        stripeCustomerId: data[0].id,
                    }
                })


            } catch (err: any) {
                console.error('Erro ao processar checkout.session.completed:', err.message);
            }
            break;

        case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription;

            try {
                const customerId = subscription.customer as string;
                const user = await prisma.users.findUnique({where: {stripeCustomerId: customerId}});

                if (!user) {
                    console.error("Usuário com ID de cliente ${customerId} não encontrado");
                    return
                }

                const plan = await prisma.plans.findUnique({where: {name: "Free"}});

                if (!plan) {
                    console.error('Plano Free não encontrado');
                    return
                }

                await prisma.userPlans.update({
                    where: {userId: user.id},
                    data: {
                        planId: plan.id,
                    },
                });
            } catch (err: any) {
                console.error('Erro ao processar customer.subscription.deleted:', err.message);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send();
});

export default router;
