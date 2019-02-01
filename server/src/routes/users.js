import express from 'express';
import { userController } from '../controllers';
import { verifyToken } from '../middlewares';

const router = express.Router();

router.get('/:userId/posts', verifyToken(), userController.viewUserPosts);

export default router;
