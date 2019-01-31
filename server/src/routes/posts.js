import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import { posts } from '../controllers';

const router = express.Router();

router.delete('/:postId', verifyToken(), posts.deletePost);

export default router;
