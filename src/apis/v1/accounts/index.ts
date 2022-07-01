import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { createAccounts, getAllUsers, searchAllUsers, getUserinfo } from './controller';
import { loginAuthMiddleware } from 'middlewares/auth';

const router = Router();

router.get('/info', loginAuthMiddleware, asyncRouteHandler(getUserinfo));
router.get('/search', asyncRouteHandler(searchAllUsers));
router.post('/', asyncRouteHandler(createAccounts));
router.get('/', asyncRouteHandler(getAllUsers));

export default router;
