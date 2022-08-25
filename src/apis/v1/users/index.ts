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
  getUserByUsername,
  getSuggestedAccounts,
} from './controller';
import { loginAuthMiddleware, forwardMiddleware } from 'middlewares/auth';

const router = Router();

router.get('/info/:username', forwardMiddleware, asyncRouteHandler(getUserByUsername));
router.get('/suggested-accounts', asyncRouteHandler(getSuggestedAccounts));
router.patch('/avatar', loginAuthMiddleware, asyncRouteHandler(updateAvatar));
router.patch('/disable', loginAuthMiddleware, asyncRouteHandler(disableUser));
router.patch('/enable', loginAuthMiddleware, asyncRouteHandler(enableUser));
router.patch('/update', loginAuthMiddleware, asyncRouteHandler(updateUser));
router.get('/info', loginAuthMiddleware, asyncRouteHandler(getUserinfo));
router.get('/search', asyncRouteHandler(searchAllUsers));
router.get('/', asyncRouteHandler(getAllUsers));

export default router;
