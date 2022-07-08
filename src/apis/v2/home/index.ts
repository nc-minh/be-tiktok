import { Router } from 'express';
import { getHome } from './controller';

const router = Router();

router.get('/', getHome);

export default router;
