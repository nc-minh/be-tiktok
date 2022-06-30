import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { createAccounts, getAllUsers, searchAllUsers } from './controller';

const router = Router();

router.post('/', asyncRouteHandler(createAccounts));
router.get('/', asyncRouteHandler(getAllUsers));
router.get('/search', asyncRouteHandler(searchAllUsers));

export default router;
