import { Router } from 'express';

import { asyncRouteHandler } from 'middlewares';
import { randomUsers } from './controller';

const router = Router();

router.get('/random-users', asyncRouteHandler(randomUsers));

export default router;
