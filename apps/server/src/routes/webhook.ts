import Stripe from 'stripe';
import express, {Router} from 'express';
import {PrismaClient} from '../../generated/prisma';

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET!);

const endpointSecret = process.env.STRIPE_HOOK as string;

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res): Promise<void> => {
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
                const customer = session.customer as string;
                const plan = await prisma.plans.findUnique({where: {name: "Pro"}});
                if (!plan) {
                    console.error('Plano Pro não encontrado');
                    return
                }

                const user = await prisma.users.findUnique({
                    where: {stripeCustomerId: customer},
                });

                if (!user) {
                    console.error(`Usuário com stripeCustomerId ${customer} não encontrado`);
                    return
                }

                await prisma.userPlans.update({
                    where: {userId: user.id},
                    data: {
                        planId: plan.id,
                    },
                });

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

                const plan = await prisma.plans.findUnique({where: {name: "free"}});

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

                await prisma.subscription.update({
                    where: {stripeSubscriptionId: subscription.id},
                    data: {
                        status: "cancelled"
                    }
                })

            } catch (err: any) {
                console.error('Erro ao processar customer.subscription.deleted:', err.message);
            }
            break;

        case 'customer.subscription.created':
            const newSub = event.data.object as Stripe.Subscription;

            try {
                const customerId = newSub.customer as string;

                const user = await prisma.users.findUnique({
                    where: {stripeCustomerId: customerId},
                });

                if (!user) {
                    console.error(`Usuário com stripeCustomerId ${customerId} não encontrado`);
                    break;
                }

                if (!user.stripeCustomerId) {
                    await prisma.users.update({
                        where: {id: user.id},
                        data: {
                            stripeCustomerId: customerId,
                        }
                    })
                }

                await prisma.subscription.create({
                    data: {
                        stripeSubscriptionId: newSub.id,
                        userId: user.id,
                        status: newSub.status,
                        currentPeriodStart: new Date(newSub.items.data[0].current_period_start * 1000),
                        currentPeriodEnd: new Date(newSub.items.data[0].current_period_end * 1000),
                        cancelAtPeriodEnd: newSub.cancel_at_period_end,
                    }
                });

                console.log('Assinatura salva com sucesso');
            } catch (err: any) {
                console.error('Erro ao salvar assinatura:', err.message);
            }

            break;

        case 'invoice.finalized':
            const finalizedInvoice = event.data.object as Stripe.Invoice;

            try {
                const customerId = finalizedInvoice.customer as string;
                const user = await prisma.users.findUnique({where: {stripeCustomerId: customerId}});

                if (!user) {
                    console.error(`Usuário com stripeCustomerId ${customerId} não encontrado`);
                    break;
                }

                await prisma.invoice.create({
                    data: {
                        stripeInvoiceId: finalizedInvoice.id!,
                        userId: user.id,
                        amountDue: finalizedInvoice.amount_due,
                        amountPaid: finalizedInvoice.amount_paid,
                        invoiceUrl: finalizedInvoice.hosted_invoice_url,
                        status: finalizedInvoice.status!,
                        dueDate: finalizedInvoice.due_date ? new Date(finalizedInvoice.due_date * 1000) : null,
                        createdAt: new Date(finalizedInvoice.created * 1000),
                    }
                });

                console.log(`Fatura ${finalizedInvoice.id} salva com sucesso.`);
            } catch (err: any) {
                console.error('Erro ao salvar fatura:', err.message);
            }
            break;


        case 'customer.subscription.updated':
            const updatedSub = event.data.object as Stripe.Subscription;

            await prisma.subscription.update({
                where: {stripeSubscriptionId: updatedSub.id},
                data: {
                    status: updatedSub.status,
                    currentPeriodStart: new Date(updatedSub.items.data[0].current_period_start * 1000),
                    currentPeriodEnd: new Date(updatedSub.items.data[0].current_period_end * 1000),
                    cancelAtPeriodEnd: updatedSub.cancel_at_period_end,
                    updatedAt: new Date(),
                },
            });
            break;

        default:
            console.warn(`Unhandled event type ${event.type}`);
    }

    res.status(200).send();
});

export default router;