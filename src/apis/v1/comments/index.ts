import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { forwardMiddleware, loginAuthMiddleware } from 'middlewares/auth';
import { createComment, updateComment, forceDeleteComment, getAllCommentsOfPost } from './controller';

const router = Router();

router.post('/', loginAuthMiddleware, asyncRouteHandler(createComment));
router.patch('/:id', loginAuthMiddleware, asyncRouteHandler(updateComment));
router.delete('/:id', loginAuthMiddleware, asyncRouteHandler(forceDeleteComment));
router.get('/:id', forwardMiddleware, getAllCommentsOfPost);

export default router;
