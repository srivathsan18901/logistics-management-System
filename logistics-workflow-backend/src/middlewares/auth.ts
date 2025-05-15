import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import { IUser } from '../models/User';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}
export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  
  try {
    const decoded = verifyToken(token) as { id: string; username: string; role: string };
    // You would typically fetch the user from DB here
    req.user = {
      _id: decoded.id,
      username: decoded.username,
      role: decoded.role
    } as IUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const authorize = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role!)) {
      return res.status(403).json({ message: 'Not authorized to access this route' });
    }
    next();
  };
};