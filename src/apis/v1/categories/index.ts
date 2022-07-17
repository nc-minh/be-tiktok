import { Router } from 'express';
import { adminAuthMiddleware } from 'middlewares/auth';
import {
  createCategory,
  updateCategory,
  forceDeleteCategory,
  getAllCategories,
  getAllPostsOfCategory,
} from './controller';

const router = Router();

router.post('/', adminAuthMiddleware, createCategory);
router.patch('/', adminAuthMiddleware, updateCategory);
router.delete('/', adminAuthMiddleware, forceDeleteCategory);
router.get('/', getAllCategories);
router.get('/:id', getAllPostsOfCategory);

export default router;
