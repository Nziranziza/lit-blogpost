import moment from 'moment';
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
      return res.status(404).json({ status: 404, message: 'Unauthorized action' });
    }

    if (post.get().status === 'deleted') {
      return res.status(404).json({ status: 404, message: 'Post had already been deleted' });
    }

    await post.update({ status: 'deleted', updatedAt: moment().format() });

    return res.status(404).json({ status: 404, message: 'The post was deleted successfully' });
  }
}
