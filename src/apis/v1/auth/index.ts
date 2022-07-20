import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { login, refreshToken, register } from './controller';

const router = Router();

router.post('/login', asyncRouteHandler(login));
router.post('/register', asyncRouteHandler(register));
router.post('/refresh-token', asyncRouteHandler(refreshToken));

export default router;
