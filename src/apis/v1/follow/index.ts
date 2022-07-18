import { Router } from 'express';
import { loginAuthMiddleware } from 'middlewares/auth';
import { follow, getFollower, getFollowing } from './controller';

const router = Router();

router.post('/', loginAuthMiddleware, follow);
router.get('/followers/:id', getFollower);
router.get('/followings/:id', getFollowing);

export default router;
