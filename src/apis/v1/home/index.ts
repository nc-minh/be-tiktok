import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { getHome } from './controller';

const router = Router();

router.get('/', asyncRouteHandler(getHome));

export default router;
