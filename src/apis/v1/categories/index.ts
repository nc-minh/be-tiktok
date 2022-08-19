import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { adminAuthMiddleware } from 'middlewares/auth';
import {
  createCategory,
  updateCategory,
  forceDeleteCategory,
  getAllCategories,
  getAllPostsOfCategory,
} from './controller';

const router = Router();

router.post('/', adminAuthMiddleware, asyncRouteHandler(createCategory));
router.patch('/', adminAuthMiddleware, asyncRouteHandler(updateCategory));
router.delete('/', adminAuthMiddleware, asyncRouteHandler(forceDeleteCategory));
router.get('/', asyncRouteHandler(getAllCategories));
router.get('/:id', asyncRouteHandler(getAllPostsOfCategory));

export default router;
