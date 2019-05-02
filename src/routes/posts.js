import express from 'express';
import { celebrate } from 'celebrate';
import verifyToken from '../middlewares/verifyToken';
import { postController } from '../controllers';
import { postValidator } from './validators';
import { asyncHandler } from '../helpers';

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/:postId', verifyToken({ openAccess: true }), postController.viewPost);
router.delete('/:postId', verifyToken(), postController.deletePost);
router.put('/:postId/publish', verifyToken(), postController.publishPost);
router.post(
  '/:postId/comments',
  celebrate({
    body: postValidator.comment
  }),
  verifyToken(),
  asyncHandler(postController.commentPost)
);
router.put('/:postId', verifyToken(), postController.editPost);
router.post(
  '/',
  celebrate({ body: postValidator.createPost }),
  verifyToken(),
  asyncHandler(postController.createPost)
);
router.get('/:postId/comments', verifyToken(), asyncHandler(postController.viewComment));
router.delete('/:postId/comments/:id', verifyToken(), asyncHandler(postController.deleteComment));

export default router;
