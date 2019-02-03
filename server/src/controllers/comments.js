import { Post, User, Comment } from '../database/models';

export default class CommentController {
  static async viewComment(req, res) {
    const { postId } = req.params;
    try {
      const post = await Post.findOne({
        attributes: ['title'],
        where: { id: postId, status: 'published' }
      });

      if (!post) {
        return res.status(404).json({ status: 404, message: 'The post does not exist' });
      }
      const comment = await Comment.findAll({
        include: [{ model: User, attributes: ['firstName'] }],
        where: { postId: postId }
      });

      return res.status(200).json({ status: 200, Post: post, comments: comment });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ status: 401, message: 'Please Try again' });
    }
  }
}
