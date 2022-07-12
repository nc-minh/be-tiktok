import { Router } from 'express';
import homeRouter from './home';
import userRouter from './user';
import authRouter from './auth';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/', homeRouter);

export default router;
