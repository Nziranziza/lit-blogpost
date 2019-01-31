import express from 'express';
import { users } from '../controllers';
import { verifyToken } from '../middlewares';

const router = express.Router();

router.get('/:id/posts', verifyToken(), users.viewPosts);

export default router;
