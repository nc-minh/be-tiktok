import { Router } from 'express';
import { loginAuthMiddleware } from 'middlewares/auth';
import { commentReaction, getAllUserReactComment } from './controller';

const router = Router();

router.post('/', loginAuthMiddleware, commentReaction);
router.get('/:id', getAllUserReactComment);

export default router;
