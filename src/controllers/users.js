import { Op } from 'sequelize';
import { Post } from '../database/models';

class UserController {
  /**
   * @author Chris
   * @description Method to view all posts it takes request parameter of user id.
   */
  static async viewUserPosts(req, res) {
    const { userId } = req.params;
    const { currentUser } = req.body;
    // Condition to query posts that don't have status as 'deleted'
    const where = { userId, status: { [Op.and]: [{ [Op.ne]: 'deleted' }] } };
    if (currentUser.id !== userId && currentUser.userType !== 'admin') {
      // Condition to query posts of other users that don't have status as 'draft' and 'unpublished'
      where.status[Op.and].push({ [Op.ne]: 'unpublished' });
      where.status[Op.and].push({ [Op.ne]: 'draft' });
    }
    const allPosts = await Post.findAll({
      where
    });
    return res.status(200).json({ status: 200, posts: allPosts });
  }
}

export default UserController;
