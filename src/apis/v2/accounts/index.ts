import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { searchAllUsers, test } from './controller';
import { loginAuthMiddleware } from 'middlewares/auth';

const router = Router();

router.get('/search', asyncRouteHandler(searchAllUsers));
router.get('/test', asyncRouteHandler(test));

export default router;
