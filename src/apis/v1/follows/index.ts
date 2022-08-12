import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { loginAuthMiddleware } from 'middlewares/auth';
import { follow, getFollower, getFollowing } from './controller';

const router = Router();

router.post('/', loginAuthMiddleware, asyncRouteHandler(follow));
router.get('/followers/:id', asyncRouteHandler(getFollower));
router.get('/followings/:id', asyncRouteHandler(getFollowing));

export default router;
