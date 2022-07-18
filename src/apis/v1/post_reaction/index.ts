import { Router } from 'express';
import { loginAuthMiddleware } from 'middlewares/auth';
import { postReaction, getAllUserReactPost } from './controller';

const router = Router();

router.post('/', loginAuthMiddleware, postReaction);
router.get('/:id', getAllUserReactPost);

export default router;
