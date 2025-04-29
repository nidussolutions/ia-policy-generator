import {Router} from 'express';
import {PrismaClient} from '../../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Stripe from "stripe";
import axios from 'axios';

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET as string);

const jwtSecret = process.env.JWT_SECRET as string;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY as string;

// Helper function to verify reCAPTCHA token
const verifyRecaptcha = async (token: string): Promise<boolean> => {
    try {
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: RECAPTCHA_SECRET_KEY,
                    response: token
                }
            }
        );

        return response.data.success;
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return false;
    }
};

const generateAccessToken = (userId: string) =>
    jwt.sign({userId}, jwtSecret, {expiresIn: '7d'});


router.post('/register', async (req, res): Promise<any> => {
    const {email, password, name, identity, recaptchaToken} = req.body;

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
        return res.status(400).json({error: 'reCAPTCHA verification is required'});
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
        return res.status(400).json({error: 'reCAPTCHA verification failed'});
    }

    try {
        const userExist = await prisma.users.findUnique({where: {email}});
        if (userExist) return res.status(400).json({message: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);

        const plan = await prisma.plans.findFirst({where: {name: 'free'}});

        if (!plan) return res.status(400).json({message: 'Plan not found'});

        const customer = await stripe.customers.create({
            email,
            name,
            metadata: {
                identity: identity.replace(/\D/g, ''),
            },
        })

        if (!customer) return res.status(400).json({message: 'Error creating customer'});

        const user = await prisma.users.create({
            data: {
                stripeCustomerId: customer.id,
                email,
                password: hashedPassword,
                name,
                identity: identity.replace(/\D/g, ''),
            },
        });

        if (!user) return res.status(400).json({message: 'Error creating user'});

        await prisma.userPlans.create({
            data: {
                userId: user.id,
                planId: plan!.id,
            },
        });

        const accessToken = generateAccessToken(user.id);

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                plan: {
                    id: plan!.id,
                    name: plan!.name,
                    price: plan!.price,
                },
            },
            token: accessToken,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.post('/login', async (req, res): Promise<any> => {
    const {email, password, recaptchaToken} = req.body;

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
        return res.status(400).json({error: 'reCAPTCHA verification is required'});
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
    if (!isValidRecaptcha) {
        return res.status(400).json({error: 'reCAPTCHA verification failed'});
    }

    try {
        const user = await prisma.users.findUnique({where: {email}});
        if (!user) return res.status(400).json({error: 'User not found'});

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({error: 'Invalid password'});

        const accessToken = generateAccessToken(user.id);

        await prisma.users.update({
            where: {id: user.id},
            data: {lastLogin: new Date()},
        });

        res.status(200).json({token: accessToken});
    } catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/validate-token', async (req, res): Promise<any> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({valid: false, error: 'Token not provided'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: string, iat: number, exp: number };

        return res.status(200).json({valid: true, userId: decoded.userId});
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({valid: false, error: 'Token expired'});
        }

        return res.status(401).json({valid: false, error: 'Invalid token'});
    }
});

export default router;
