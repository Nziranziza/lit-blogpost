import { Post } from '../database/models';

export default class PostController {
  static async deletePost(req, res) {
    const { currentUser } = req.body;
    const { postId } = req.params;

    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ status: 404, message: 'The post does not exist' });
    }

    if (post.get().userId !== currentUser.id) {
      return res.status(404).json({ status: 404, message: 'The post does not exist' });
    }

    await post.update({ status: 'deleted' });

    return res.status(404).json({ status: 404, message: 'The post does not exist' });
  }
}
