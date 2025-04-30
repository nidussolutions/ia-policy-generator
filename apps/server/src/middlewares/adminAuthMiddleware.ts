import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET || 'secret';

export interface AdminAuthRequest extends Request {
  adminId?: string;
}

export const adminAuthMiddleware: RequestHandler = async (
  req: AdminAuthRequest,
  res: Response,
  next: NextFunction
):Promise<any> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    
    // Verify that the user is an admin
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.userId },
    });

    if (!admin) {
      return res.status(403).json({ error: 'Not authorized as admin' });
    }

    req.adminId = decoded.userId;
    next();
  } catch (error) {
    console.log('Error during admin token validation: ', error);
    res.status(401).json({ error: 'Invalid Token' });
  }
};