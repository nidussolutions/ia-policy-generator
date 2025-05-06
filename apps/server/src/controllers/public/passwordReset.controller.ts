import { Response, Request } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../../../generated/prisma';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'contato@thelegalforge.com',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN,
  },
});

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email } = req.body;

  console.log('Attempting to send email to:', email);

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt: expires,
      },
    });

    const resetLink = `${process.env.DOMAIN}/auth/reset-password?token=${token}`;

    const html = `<!DOCTYPE html>
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
                  </html>`;

    const mailOptions = {
      from: 'contato@thelegalforge.com',
      to: req.body.email,
      subject: 'Reset your password',
      html: html,
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error ' + err);
      } else {
        console.log('Email sent successfully');
      }
    });

    res.status(200).json({ message: 'Password reset link sent' });
    console.log('Email sent successfully');
  } catch (error: any) {
    console.error('Error details:', error);
    if (error.name === 'MailerSendError') {
      return res.status(400).json({
        message: 'Failed to send email',
        details: error.message,
      });
    }
    res.status(500).json({
      message: 'An unexpected error occurred',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { token, password } = req.body;

  try {
    const resetRequest = await prisma.passwordReset.findUnique({
      where: { token },
    });
    if (!resetRequest || resetRequest.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.users.update({
      where: { id: resetRequest.userId },
      data: { password: hashed },
    });

    await prisma.passwordReset.delete({ where: { token } });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Could not reset password' });
  }
};
