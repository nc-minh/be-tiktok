import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import {
  createUser,
  getAllUsers,
  searchAllUsers,
  getUserinfo,
  updateUser,
  softDeleteUser,
  restoreUser,
} from './controller';
import { loginAuthMiddleware } from 'middlewares/auth';

const router = Router();

router.delete('/delete', loginAuthMiddleware, asyncRouteHandler(softDeleteUser));
router.delete('/restore', loginAuthMiddleware, asyncRouteHandler(restoreUser));
router.patch('/update', loginAuthMiddleware, asyncRouteHandler(updateUser));
router.get('/info', loginAuthMiddleware, asyncRouteHandler(getUserinfo));
router.get('/search', asyncRouteHandler(searchAllUsers));
router.post('/', asyncRouteHandler(createUser));
router.get('/', asyncRouteHandler(getAllUsers));

export default router;
