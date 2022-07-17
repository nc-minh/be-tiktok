import { Router } from 'express';
import { loginAuthMiddleware, adminAuthMiddleware } from 'middlewares/auth';
import {
  createPost,
  updatePost,
  softDeletePost,
  restorePost,
  forceDeletePost,
  getAllPosts,
  getAllPostsOfUser,
  getPost,
} from './controller';

const router = Router();

router.get('/user/:id', getAllPostsOfUser);
router.get('/:id', getPost);
router.patch('/restore', loginAuthMiddleware, restorePost);
router.patch('/soft-delete', loginAuthMiddleware, softDeletePost);
router.post('/', loginAuthMiddleware, createPost);
router.patch('/', loginAuthMiddleware, updatePost);
router.delete('/', loginAuthMiddleware, forceDeletePost);
router.get('/', adminAuthMiddleware, getAllPosts);

export default router;
