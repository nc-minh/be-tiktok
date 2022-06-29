import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { createAccount } from './controller';

const router = Router();

router.post('/', asyncRouteHandler(createAccount));

export default router;
