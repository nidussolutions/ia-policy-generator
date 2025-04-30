import {Router} from 'express'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import {PrismaClient} from "../../generated/prisma";
import {MailerSend, EmailParams, Sender, Recipient} from "mailersend";

const router = Router();
const prisma = new PrismaClient();

router.post('/forgot-password', async (req , res): Promise<any> => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const mailerSend = new MailerSend({
        apiKey: process.env.API_KEY as string,
    });
    const sentFrom = new Sender(process.env.EMAIL_USER as string, "Legal Forge");

    const recipients = [
        new Recipient(email, email.split('@')[0]),
    ];

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

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("Reset your password")
            .setHtml(`
                  <!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <title>Password Reset</title>
                      <style>
                        body {
                          font-family: Arial, sans-serif;
                          background-color: #f6f6f6;
                          margin: 0;
                          padding: 0;
                        }
                        .container {
                          background-color: #ffffff;
                          max-width: 400px;
                          margin: 40px auto;
                          padding: 30px 20px;
                          border-radius: 8px;
                          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                          text-align: center;
                        }
                        .btn {
                          display: inline-block;
                          margin-top: 20px;
                          padding: 12px 30px;
                          background-color: #007bff;
                          color: #fff !important;
                          text-decoration: none;
                          border-radius: 5px;
                          font-weight: bold;
                          font-size: 16px;
                        }
                        .footer {
                          margin-top: 30px;
                          font-size: 12px;
                          color: #888;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                            <h2>Password Reset</h2>                            
                            <p>Hi, ${user.name}</p>
                            <p>We received a request to reset your password. Click the button below to set a new password.</p>
                            <a href="${resetLink}" class="btn">Reset Password</a>
                            <p>If you didn't request this, please ignore this email.</p>
                            <p>Thank you,</p>   
                            <p>The Legal Forge Team</p>
                        <div class="footer">
                          &copy; 2024 Legal Forge. All rights reserved.
                        </div>
                      </div>
                    </body>
                    </html>     
            `)
        await mailerSend.email.send(emailParams);
        res.status(200).json({message: 'Password reset link sent'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error', error});
    }
});


router.post('/reset-password', async (req, res): Promise<any> => {
    const {token, password} = req.body;

    try {
        const resetRequest = await prisma.passwordReset.findUnique({where: {token}});
        if (!resetRequest || resetRequest.expiresAt < new Date()) {
            return res.status(400).json({message: 'Invalid or expired token'});
        }
        console.log(password);

        const hashed = await bcrypt.hash(password, 10);

        console.log(hashed);

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
