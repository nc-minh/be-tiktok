import { Router } from 'express';
import { createAccount } from './controller';

const router = Router();

router.get('/', createAccount);

export default router;
