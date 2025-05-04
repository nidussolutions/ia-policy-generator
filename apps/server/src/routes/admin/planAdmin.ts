import {Router, Response} from 'express';
import {PrismaClient} from '../../../generated/prisma';
import Stripe from 'stripe';
import {adminAuthMiddleware, AdminAuthRequest} from '../../middlewares/adminAuthMiddleware';

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET!);

// Get all plans (from both Stripe and local database)
router.get('/', adminAuthMiddleware, async (_req: AdminAuthRequest, res: Response) => {
    try {
        // Get products and prices from Stripe
        const {data: stripeProducts} = await stripe.products.list({active: true, limit: 100});
        const {data: stripePrices} = await stripe.prices.list({active: true, limit: 100});

        // Map Stripe products with their prices
        const stripePlans = stripeProducts.map(product => {
            const prices = stripePrices.filter(price => price.product === product.id);
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                prices: prices.map(price => ({
                    unit_amount: price.unit_amount,
                })),
                metadata: product.metadata,
            };
        });

        res.status(200).json(stripePlans);
    } catch (error) {
        console.error('Error fetching plans:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

// Create a new plan (in both Stripe and local database)
router.post('/', adminAuthMiddleware, async (req: AdminAuthRequest, res: Response) => {
    const {name, description, type, amount, currency = 'brl', interval = 'month'} = req.body;

    try {
        // Create a product in Stripe
        const product = await stripe.products.create({
            name,
            description,
            metadata: {type},
        });

        // Create price in Stripe
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: amount,
            currency,
            recurring: {interval},
        });

        // Create a plan in a local database
        const newPlan = await prisma.plans.create({
            data: {
                name,
                description,
                type,
                price: price.id,
            },
        });

        res.status(201).json({
            message: 'Plan created successfully',
            plan: {
                id: newPlan.id,
                name: newPlan.name,
                description: newPlan.description,
                type: newPlan.type,
                price: newPlan.price,
                stripeProductId: product.id,
                stripePriceId: price.id,
            },
        });
    } catch (error) {
        console.error('Error creating plan:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

// Update a plan (in both Stripe and local database)
router.put('/:id', adminAuthMiddleware, async (req: AdminAuthRequest, res: Response): Promise<any> => {
    const {id} = req.params;
    const {name, description, type, active} = req.body;

    try {
        // Get the plan from a local database
        const plan = await prisma.plans.findUnique({
            where: {id},
        });

        if (!plan) {
            return res.status(404).json({message: 'Plan not found'});
        }

        // Get the price from Stripe to find the product ID
        const stripePrice = await stripe.prices.retrieve(plan.price);

        if (!stripePrice || typeof stripePrice.product !== 'string') {
            return res.status(404).json({message: 'Stripe price or product not found'});
        }

        // Update product in Stripe
        await stripe.products.update(stripePrice.product, {
            name,
            description,
            active: active !== undefined ? active : undefined,
            metadata: type ? {type} : undefined,
        });

        // Update plan in a local database
        const updatedPlan = await prisma.plans.update({
            where: {id},
            data: {
                name,
                description,
                type,
            },
        });

        res.status(200).json({
            message: 'Plan updated successfully',
            plan: {
                id: updatedPlan.id,
                name: updatedPlan.name,
                description: updatedPlan.description,
                type: updatedPlan.type,
                price: updatedPlan.price,
            },
        });
    } catch (error) {
        console.error('Error updating plan:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

// Create a new price for an existing plan
router.post('/:id/prices', adminAuthMiddleware, async (req: AdminAuthRequest, res: Response): Promise<any> => {
    const {id} = req.params;
    const {amount, currency = 'brl', interval = 'month'} = req.body;

    try {
        // Get the plan from a local database
        const plan = await prisma.plans.findUnique({
            where: {id},
        });

        if (!plan) {
            return res.status(404).json({message: 'Plan not found'});
        }

        // Get the price from Stripe to find the product ID
        const oldPrice = await stripe.prices.retrieve(plan.price);

        if (!oldPrice || typeof oldPrice.product !== 'string') {
            return res.status(404).json({message: 'Stripe price or product not found'});
        }

        // Create new price in Stripe
        const newPrice = await stripe.prices.create({
            product: oldPrice.product,
            unit_amount: amount,
            currency,
            recurring: {interval},
        });

        // Update the plan in a local database with the new price
        const updatedPlan = await prisma.plans.update({
            where: {id},
            data: {
                price: newPrice.id,
            },
        });

        res.status(201).json({
            message: 'New price created successfully',
            plan: {
                id: updatedPlan.id,
                name: updatedPlan.name,
                description: updatedPlan.description,
                type: updatedPlan.type,
                price: updatedPlan.price,
                stripePriceId: newPrice.id,
            },
        });
    } catch (error) {
        console.error('Error creating new price:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

// Sync plans between Stripe and a local database
router.post('/sync', adminAuthMiddleware, async (_req: AdminAuthRequest, res: Response) => {
    try {
        // Get all products and prices from Stripe
        const {data: stripeProducts} = await stripe.products.list({limit: 100});
        const {data: stripePrices} = await stripe.prices.list({limit: 100});

        // Get all plans from a local database
        const localPlans = await prisma.plans.findMany();

        // Create a map of Stripe price IDs to local plan IDs
        const priceToPlanMap = new Map(localPlans.map(plan => [plan.price, plan.id]));

        // Track which Stripe prices are already in the local database
        const processedPriceIds = new Set();

        // Update existing plans and add new ones
        for (const product of stripeProducts) {
            // Find prices for this product
            const productPrices = stripePrices.filter(price => price.product === product.id);

            for (const price of productPrices) {
                const localPlanId = priceToPlanMap.get(price.id);

                if (localPlanId) {
                    // Update an existing plan
                    await prisma.plans.update({
                        where: {id: localPlanId},
                        data: {
                            name: product.name,
                            description: product.description || '',
                            type: product.metadata?.type || 'standard',
                        },
                    });
                } else if (price.active) {
                    // Create a new plan for active prices not in a local database
                    await prisma.plans.create({
                        data: {
                            name: product.name,
                            description: product.description || '',
                            type: product.metadata?.type || 'standard',
                            price: price.id,
                        },
                    });
                }

                processedPriceIds.add(price.id);
            }
        }

        // Find plans in a local database that no longer exist in Stripe
        const plansToDeactivate = localPlans.filter(plan => !processedPriceIds.has(plan.price));

        // You might want to handle these differently based on your business logic,
        // For example, you could mark them as inactive rather than deleting them

        res.status(200).json({
            message: 'Plans synchronized successfully',
            added: stripePrices.filter(price => price.active && !priceToPlanMap.has(price.id)).length,
            updated: processedPriceIds.size - (stripePrices.filter(price => price.active && !priceToPlanMap.has(price.id)).length),
            deactivated: plansToDeactivate.length,
        });
    } catch (error) {
        console.error('Error synchronizing plans:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

export default router;