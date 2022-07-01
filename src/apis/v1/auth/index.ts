import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { login } from './controller';

const router = Router();

router.post('/login', asyncRouteHandler(login));

export default router;
