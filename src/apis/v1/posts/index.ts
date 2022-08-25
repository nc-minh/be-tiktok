import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { forwardMiddleware, loginAuthMiddleware } from 'middlewares/auth';
import {
  createPost,
  updatePost,
  softDeletePost,
  restorePost,
  forceDeletePost,
  getAllPosts,
  getAllPostsOfUser,
  getPost,
  viewPost,
} from './controller';

const router = Router();

router.get('/view/:id', asyncRouteHandler(viewPost));
router.get('/user/:id', forwardMiddleware, asyncRouteHandler(getAllPostsOfUser));
router.get('/:id', asyncRouteHandler(getPost));
router.patch('/restore', loginAuthMiddleware, asyncRouteHandler(restorePost));
router.patch('/soft-delete', loginAuthMiddleware, asyncRouteHandler(softDeletePost));
router.post('/', loginAuthMiddleware, asyncRouteHandler(createPost));
router.patch('/', loginAuthMiddleware, asyncRouteHandler(updatePost));
router.delete('/', loginAuthMiddleware, asyncRouteHandler(forceDeletePost));
router.get('/', asyncRouteHandler(getAllPosts));

export default router;
