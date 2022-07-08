import { Router } from 'express';
import accountsRouter from './accounts';

const router = Router();
router.use('/', accountsRouter);
export default router;
