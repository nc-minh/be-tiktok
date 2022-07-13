import { Router } from 'express';
import userRouter from './users';
import homeRouter from './home';

const router = Router();

router.use('/users', userRouter);
router.use('/', homeRouter);

export default router;
