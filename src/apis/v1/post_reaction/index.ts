import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { loginAuthMiddleware } from 'middlewares/auth';
import { postReaction, getAllUserReactPost } from './controller';

const router = Router();

router.post('/', loginAuthMiddleware, asyncRouteHandler(postReaction));
router.get('/:id', getAllUserReactPost);

export default router;
