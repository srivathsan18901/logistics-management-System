import { Router } from 'express';
import express  from 'express';
import * as authController from '../controllers/authController';
import { protect } from '../middlewares/auth';

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', protect as express.RequestHandler, authController.getMe);

export default router;