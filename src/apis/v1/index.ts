import { Router } from 'express';
import homeRouter from './home';
import accountRouter from './accounts';
import authRouter from './auth'

const router = Router();

router.use('/users', accountRouter);
router.use('/auth', authRouter);
router.use('/', homeRouter);

export default router;
