import { Router } from 'express';
import { createPost, updatePost, softDeletePost, restorePost, forceDeletePost } from './controller';

const router = Router();

router.patch('/restore', restorePost);
router.patch('/soft-delete', softDeletePost);
router.post('/', createPost);
router.patch('/', updatePost);
router.delete('/', forceDeletePost);

export default router;
