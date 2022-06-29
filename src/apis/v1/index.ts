import { Router } from 'express';
import homeRouter from './home';
import accountRouter from './accounts';

const router = Router();

router.use('/users', accountRouter);
router.use('/', homeRouter);

export default router;
