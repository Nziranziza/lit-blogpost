import { Post } from '../database/models';
import logger from '../helpers/logger';

class users {
  // Method to view all posts it takes request parameter of user id.
  // Author Chris
  static async viewPosts(req, res) {
    const userId = req.params.id;
    try {
      const allPosts = await Post.findAll({
        where: {
          userId
        }
      });
      res.status(200).send(allPosts);
    } catch (err) {
      logger.info(err.message);
      res.status(404).send({ message: 'Error' });
    }
  }
}
export default users;
