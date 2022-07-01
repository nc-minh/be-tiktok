import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { login, refreshToken } from './controller';

const router = Router();

router.post('/login', asyncRouteHandler(login));
router.post('/refresh-token', asyncRouteHandler(refreshToken));

export default router;
