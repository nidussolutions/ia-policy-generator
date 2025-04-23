import {Router} from 'express';
import {PrismaClient} from '../../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Stripe from "stripe";

const router = Router();
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET as string);

const jwtSecret = process.env.JWT_SECRET || 'secret';
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'refreshSecret';

const generateAccessToken = (userId: string) =>
    jwt.sign({userId}, jwtSecret, {expiresIn: '15min'});

const generateRefreshToken = (userId: string) =>
    jwt.sign({userId}, jwtRefreshSecret, {expiresIn: '7d'});

router.post('/register', async (req, res): Promise<any> => {
    const {email, password, name, identity} = req.body;

    try {
        const userExist = await prisma.users.findUnique({where: {email}});
        if (userExist) return res.status(400).json({message: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);

        const plan = await prisma.plans.findFirst({where: {name: 'Free'}});

        const user = await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                name,
                identity: identity.replace(/\D/g, ''),
            },
        });

        await prisma.userPlans.create({
            data: {
                userId: user.id,
                planId: plan!.id,
            },
        });

        if (!user) return res.status(400).json({message: 'Error creating user'});

        const customer = await stripe.customers.create({
            email,
            name,
            metadata: {
                userId: user.id,
                identity: identity.replace(/\D/g, ''),
            },
        })

        await prisma.users.update({
            where: {id: user.id},
            data: {
                stripeCustomerId: customer.id,
            }
        })

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

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
            refreshToken,
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.post('/login', async (req, res): Promise<any> => {
    const {email, password} = req.body;

    try {
        const user = await prisma.users.findUnique({where: {email}});
        if (!user) return res.status(400).json({error: 'User not found'});

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({error: 'Invalid password'});

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        await prisma.users.update({
            where: {id: user.id},
            data: {lastLogin: new Date()},
        });

        res.status(200).json({token: accessToken, refreshToken});
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

router.post('/refresh-token', async (req, res): Promise<any> => {
    const {refreshToken} = req.body;

    if (!refreshToken) return res.status(401).json({error: 'Refresh token not provided'});

    try {
        const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as { userId: string };

        const newAccessToken = generateAccessToken(decoded.userId);
        res.status(200).json({token: newAccessToken});
    } catch (error) {
        console.error('Error verifying refresh token:', error);
        res.status(403).json({error: 'Invalid or expired refresh token'});
    }
});

export default router;
