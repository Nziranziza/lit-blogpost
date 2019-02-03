import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import { postController } from '../controllers';

const router = express.Router();

router.get('/:postId', verifyToken({ openAccess: true }), postController.viewPost);
router.delete('/:postId', verifyToken(), postController.deletePost);
router.put('/:postId/publish', verifyToken(), postController.publishPost);
router.put('/:postId', verifyToken(), postController.editPost);

export default router;
