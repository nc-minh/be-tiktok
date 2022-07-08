import { Router } from 'express';
import accountsRouter from './accounts';
import homeRouter from './home';

const router = Router();

router.use('/users', accountsRouter);
router.use('/', homeRouter);

export default router;
