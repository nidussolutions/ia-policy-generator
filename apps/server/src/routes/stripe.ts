import Stripe from 'stripe';
import {Router, Response} from 'express';
import {authMiddleware, AuthRequest} from "../middlewares/authMiddlewares";
import {PrismaClient} from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET!);

const domain = process.env.DOMAIN || 'http://localhost:3000';

router.post('/create-checkout-session', authMiddleware, async (req: AuthRequest, res: Response) => {
        const userId = req.userId
        const {plan: planName} = req.body;

        const user = await prisma.users.findUnique({
            where: {id: userId},
        })

        if (!user) {
            res.status(400).json({message: 'Usuário não encontrado'});
            return;
        }

        console.log(planName);

        const plan = await prisma.plans.findUnique({
            where: {name: planName},
            select: {
                price: true,
            }
        });

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

                    }
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
        } catch
            (error) {
            console.error(error);
            res.status(500).json({message: 'Erro ao criar sessão de checkout'});
        }
    }
)
;

router.post('/create-customer-portal-session', authMiddleware, async (req: AuthRequest, res): Promise<any> => {
        const userId = req.userId;

        try {
            const user = await prisma.users.findUnique({
                where: {id: userId},
            });

            if (!user) {
                return res.status(400).json({message: 'User not found'});
            }

            const session = await stripe.billingPortal.sessions.create({
                customer: user.stripeCustomerId!,
                return_url: `${domain}/dashboard/profile`,
            });

            res.status(200).json({
                sessionId: session.id,
                url: session.url,
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({message: 'Erro ao criar sessão do portal do cliente'});
        }
    }
);


router.patch('/update-invoices-profile', authMiddleware, async (req: AuthRequest, res): Promise<any> => {
        const userId = req.userId;

        try {
            const user = await prisma.users.findUnique({
                where: {id: userId},
            });

            if (!user) {
                return res.status(400).json({message: 'User not found'});
            }

            await stripe.customers.update(
                user.stripeCustomerId!,
                {
                    name: user.name,
                    email: user.email,
                    metadata: {
                        userId: user.id,
                        identity: user.identity.replace(/\D/g, ''),
                    },
                }
            );

            const {data: invoicesStripe} = await stripe.invoices.list({
                customer: user.stripeCustomerId,
                limit: 100,
            });

            await Promise.all(invoicesStripe.map(async (invoice) => {
                const existingInvoice = await prisma.invoice.findUnique({
                    where: {stripeInvoiceId: invoice.id!},
                });

                const dueDate = invoice.due_date ? new Date(invoice.due_date * 1000) : null;

                if (existingInvoice) {
                    if (
                        existingInvoice.amountDue !== invoice.amount_due ||
                        existingInvoice.amountPaid !== invoice.amount_paid ||
                        existingInvoice.invoiceUrl !== invoice.hosted_invoice_url ||
                        existingInvoice.status !== invoice.status ||
                        existingInvoice.dueDate?.getTime() !== dueDate?.getTime()
                    ) {
                        await prisma.invoice.update({
                            where: {stripeInvoiceId: invoice.id!},
                            data: {
                                amountDue: invoice.amount_due,
                                amountPaid: invoice.amount_paid,
                                invoiceUrl: invoice.hosted_invoice_url,
                                status: invoice.status!,
                                dueDate: dueDate,
                            },
                        });
                    }
                } else {
                    await prisma.invoice.create({
                        data: {
                            stripeInvoiceId: invoice.id!,
                            userId: user.id,
                            amountDue: invoice.amount_due,
                            amountPaid: invoice.amount_paid,
                            invoiceUrl: invoice.hosted_invoice_url,
                            status: invoice.status!,
                            dueDate: dueDate,
                            createdAt: new Date(invoice.created * 1000),
                        },
                    });
                }
            }));


            return res.status(200).json({message: 'Success'});
        } catch (error) {
            console.log('Error in user profile update: ', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
)


router.patch('/update-subscription-profile', authMiddleware, async (req: AuthRequest, res): Promise<any> => {
        const userId = req.userId;

        try {
            const user = await prisma.users.findUnique({
                where: {id: userId},
            });

            if (!user) {
                return res.status(400).json({message: 'User not found'});
            }

            const {data: subscriptionsStripe} = await stripe.subscriptions.list({
                customer: user.stripeCustomerId,
            });

            if (!subscriptionsStripe) {
                return res.status(400).json({message: 'Subscription not found'});
            }

            await Promise.all(subscriptionsStripe.map(async (subscription) => {
                await prisma.subscription.upsert({
                    where: {stripeSubscriptionId: subscription.id},
                    create: {
                        stripeSubscriptionId: subscription.id,
                        userId: user.id,
                        status: subscription.status,
                        currentPeriodStart: new Date(subscription.items.data[0].current_period_start * 1000),
                        currentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
                        cancelAtPeriodEnd: subscription.cancel_at_period_end,
                    },
                    update: {
                        status: subscription.status,
                        currentPeriodStart: new Date(subscription.items.data[0].current_period_start * 1000),
                        currentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
                        cancelAtPeriodEnd: subscription.cancel_at_period_end,
                    }

                })
            }));

            const {data: subscriptionActive} = await stripe.subscriptions.list({
                customer: user.stripeCustomerId,
                status: 'active',
            })

            if (!subscriptionActive.length || subscriptionActive[0].items.data.length === 0) {
                return res.status(200).json({message: 'User not subscribed'});
            }

            const newPlan = await prisma.plans.findUnique({
                where: {price: subscriptionActive[0].items.data[0].price.id},
            })


            await prisma.userPlans.update({
                where: {userId: user.id},
                data: {
                    planId: newPlan!.id
                }
            })

            return res.status(200).json({message: 'Success'});
        } catch (error) {
            console.log('Error in user profile update: ', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
)


export default router;