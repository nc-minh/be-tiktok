import { Router } from 'express';
import homeRouter from './home';
import userRouter from './users';
import authRouter from './auth';
import postRouter from './posts';
import categoryRouter from './categories';
import commentRouter from './comments';

const router = Router();

router.use('/comments', commentRouter);
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/', homeRouter);

export default router;
