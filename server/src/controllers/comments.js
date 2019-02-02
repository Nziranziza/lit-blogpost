import { Post, Comment } from '../database/models';

export default class CommentController {
  static async commentPost(req, res) {
    const { body } = req;
    const { currentUser } = req.body;
    let user = currentUser.id;
    const { postId } = req.params;
    let postComment;
    try {
      const post = await Post.findOne({ where: { id: postId, status: 'published' } });

      if (!post) {
        return res.status(404).json({ status: 404, message: 'The post does not exist' });
      }
      postComment = await Comment.create({
        userId: user,
        postId: postId,
        ...body,
        status: 'active'
      });
      return res.status(201).json({ message: 'Comment added', Comment: postComment.get() });
    } catch (err) {
      return res.status(400).json({ message: 'try again' });
    }
  }
}
