import { Router } from 'express';
import { loginAuthMiddleware } from 'middlewares/auth';
import { createComment, updateComment, forceDeleteComment, getAllCommentsOfPost } from './controller';

const router = Router();

router.post('/', loginAuthMiddleware, createComment);
router.patch('/:id', loginAuthMiddleware, updateComment);
router.delete('/:id', loginAuthMiddleware, forceDeleteComment);
router.get('/:id', loginAuthMiddleware, getAllCommentsOfPost);

export default router;
