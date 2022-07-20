import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import {
  getAllUsers,
  searchAllUsers,
  getUserinfo,
  updateUser,
  disableUser,
  enableUser,
  updateAvatar,
} from './controller';
import { loginAuthMiddleware } from 'middlewares/auth';

const router = Router();

router.patch('/avatar', loginAuthMiddleware, asyncRouteHandler(updateAvatar));
router.patch('/disable', loginAuthMiddleware, asyncRouteHandler(disableUser));
router.patch('/enable', loginAuthMiddleware, asyncRouteHandler(enableUser));
router.patch('/update', loginAuthMiddleware, asyncRouteHandler(updateUser));
router.get('/info', loginAuthMiddleware, asyncRouteHandler(getUserinfo));
router.get('/search', asyncRouteHandler(searchAllUsers));
router.get('/', asyncRouteHandler(getAllUsers));

export default router;
