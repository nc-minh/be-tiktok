import { Router } from 'express';
import { createCategory, updateCategory, forceDeleteCategory } from './controller';

const router = Router();

router.post('/', createCategory);
router.patch('/', updateCategory);
router.delete('/', forceDeleteCategory);

export default router;
