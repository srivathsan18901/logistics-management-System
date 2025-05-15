import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { AuthenticatedRequest } from '../middlewares/auth';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const result = await authService.register(username, password, role);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({
    user: req.user
  });
};