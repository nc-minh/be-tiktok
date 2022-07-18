import { Router } from 'express';
import homeRouter from './home';
import userRouter from './users';
import authRouter from './auth';
import postRouter from './posts';
import categoryRouter from './categories';
import commentRouter from './comments';
import commentReactionRouter from './comment_reaction';
import followRouter from './follow';
import postReactionRouter from './post_reaction';

const router = Router();

router.use('/posts-reaction', postReactionRouter);
router.use('/follows', followRouter);
router.use('/comments-reaction', commentReactionRouter);
router.use('/comments', commentRouter);
router.use('/categories', categoryRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/', homeRouter);

export default router;
