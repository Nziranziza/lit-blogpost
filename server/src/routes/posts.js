import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import { celebrate } from 'celebrate';
import { postController } from '../controllers';
import { postValidator } from './validators';

const router = express.Router();

router.get('/:postId', verifyToken({ openAccess: true }), postController.viewPost);
router.delete('/:postId', verifyToken(), postController.deletePost);
router.put('/:postId/publish', verifyToken(), postController.publishPost);
router.post(
  '/:postId/comments',
  celebrate({
    body: postValidator.comment
  }),
  verifyToken(),
  postController.commentPost
);
router.put('/:postId', verifyToken(), postController.editPost);

export default router;
