import { Op } from 'sequelize';
import { Post } from '../database/models';
import logger from '../helpers/logger';

class UserController {
  // Method to view all posts it takes request parameter of user id.
  // Author Chris
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
    try {
      const allPosts = await Post.findAll({
        where
      });
      return res.status(200).json({ status: 200, data: allPosts });
    } catch (err) {
      logger.info(err.message);
      res.status(404).json({ status: 404, message: 'Error' });
    }
  }
}
export default UserController;
