import { Router } from 'express';
import { loginAuthMiddleware } from 'middlewares/auth';
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

router.post('/view', viewPost);
router.get('/user/:id', getAllPostsOfUser);
router.get('/:id', getPost);
router.patch('/restore', loginAuthMiddleware, restorePost);
router.patch('/soft-delete', loginAuthMiddleware, softDeletePost);
router.post('/', loginAuthMiddleware, createPost);
router.patch('/', loginAuthMiddleware, updatePost);
router.delete('/', loginAuthMiddleware, forceDeletePost);
router.get('/', getAllPosts);

export default router;
