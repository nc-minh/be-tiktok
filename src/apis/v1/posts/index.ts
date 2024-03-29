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
  getPostTrends,
} from './controller';

const router = Router();

router.get('/for-you', forwardMiddleware, asyncRouteHandler(getPostTrends));
router.post('/view/:id', asyncRouteHandler(viewPost));
router.get('/user/:id', forwardMiddleware, asyncRouteHandler(getAllPostsOfUser));
router.get('/:id', forwardMiddleware, asyncRouteHandler(getPost));
router.patch('/restore', loginAuthMiddleware, asyncRouteHandler(restorePost));
router.patch('/soft-delete', loginAuthMiddleware, asyncRouteHandler(softDeletePost));
router.post('/', loginAuthMiddleware, asyncRouteHandler(createPost));
router.patch('/', loginAuthMiddleware, asyncRouteHandler(updatePost));
router.delete('/', loginAuthMiddleware, asyncRouteHandler(forceDeletePost));
router.get('/', asyncRouteHandler(getAllPosts));

export default router;
