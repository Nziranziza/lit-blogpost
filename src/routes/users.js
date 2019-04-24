import express from 'express';
import { userController } from '../controllers';
import { verifyToken } from '../middlewares';
import { asyncHandler } from '../helpers';

const router = express.Router();

router.get('/:userId/posts', verifyToken(), asyncHandler(userController.viewUserPosts));

export default router;
