/**
 * v2 is elasticsearch server
 */
import { Router } from 'express';
import v1Routers from './v1';
import v2Routers from './v2';
import adminRouters from './admin';

const router = Router();

router.use('/v1', v1Routers);
router.use('/v2', v2Routers);
router.use('/admin', adminRouters);

export default router;
