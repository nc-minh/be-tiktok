import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { loginAuthMiddleware } from 'middlewares/auth';
import { commentReaction, getAllUserReactComment } from './controller';

const router = Router();

router.post('/', loginAuthMiddleware, asyncRouteHandler(commentReaction));
router.get('/:id', asyncRouteHandler(getAllUserReactComment));

export default router;
