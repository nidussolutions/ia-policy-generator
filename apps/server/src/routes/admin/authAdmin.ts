import {Router} from 'express';
import {PrismaClient} from '../../../generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();

const jwtSecret = process.env.JWT_SECRET as string;

const generateAccessToken = (userId: string) =>
    jwt.sign({userId}, jwtSecret, {expiresIn: '7d'});

router.post('/register', async (req, res): Promise<any> => {
    const {email, password, name} = req.body;

    try {
        const userExist = await prisma.admin.findUnique({where: {email}});
        if (userExist) return res.status(400).json({message: 'User already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.admin.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        if (!user) return res.status(400).json({message: 'Error creating user'});

        const accessToken = generateAccessToken(user.id);
        return res.status(200).json({accessToken});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
});

router.post('/login', async (req, res): Promise<any> => {
    const {email, password} = req.body;

    try {
        const user = await prisma.admin.findUnique({where: {email}});
        if (!user) return res.status(400).json({message: 'User not found'});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({message: 'Invalid password'});

        const accessToken = generateAccessToken(user.id);
        return res.status(200).json({accessToken});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
})

router.get('/validate-token', async (req, res): Promise<any> => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Token not provided'});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as { userId: string, iat: number, exp: number };

        const user = await prisma.admin.findUnique({where: {id: decoded.userId}});

        if (!user) {
            return res.status(401).json({valid: false, message: 'Invalid token'});
        }

        return res.status(200).json({valid: true, userId: user.id});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: 'Internal server error'});
    }
})

export default router;