import express from 'express';
import { commentController } from '../controllers';
import { verifyToken } from '../middlewares';

const router = express.Router();

router.get('/:postId/post', verifyToken(), commentController.viewComment);

export default router;
