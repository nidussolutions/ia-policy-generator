import {Router} from 'express'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import {AuthRequest} from "../middlewares/authMiddlewares";
import {PrismaClient} from "../../generated/prisma";

const router = Router();
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

router.post('/forgot-password', async (req: AuthRequest, res): Promise<any> => {
    const {email} = req.body;

    try {
        const user = await prisma.users.findUnique({where: {email}});
        if (!user) return res.status(404).json({message: 'Email not found'});

        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

        await prisma.passwordReset.create({
            data: {
                userId: user.id,
                token,
                expiresAt: expires,
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 1 hour.</p>`,
        });

        res.status(200).json({message: 'Password reset link sent'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error', error});
    }
});


router.post('/reset-password', async (req, res): Promise<any> => {
    const {token, newPassword} = req.body;

    try {
        const resetRequest = await prisma.passwordReset.findUnique({where: {token}});
        if (!resetRequest || resetRequest.expiresAt < new Date()) {
            return res.status(400).json({message: 'Invalid or expired token'});
        }

        const hashed = await bcrypt.hash(newPassword, 10);

        await prisma.users.update({
            where: {id: resetRequest.userId},
            data: {password: hashed},
        });

        await prisma.passwordReset.delete({where: {token}});

        res.status(200).json({message: 'Password updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Could not reset password'});
    }
});

export default router;