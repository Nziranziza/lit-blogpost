import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import { commentValidator } from './validators';
import { commentController } from '../controllers';

const router = express.Router();

router.post('/:postId/comment', verifyToken(), commentController.commentPost);

export default router;
