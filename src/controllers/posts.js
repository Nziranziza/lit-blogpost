import moment from 'moment';
import { Op } from 'sequelize';
import { Post, User, Comment } from '../database/models';

export default class PostController {
  /**
   * @author Manzi
   */
  static async createPost(req, res) {
    const { title, text, tags, currentUser } = req.body;
    const post = await Post.create({
      userId: currentUser.id,
      title,
      text,
      tags
    });
    return res.status(201).json({ message: 'Blog post was created', post: post.get() });
  }

  /**
   * @author Olivier
   * @author Chris
   * */
  static async viewPost(req, res) {
    const { currentUser } = req.body;
    const { postId } = req.params;
    const protectedStatus = ['draft', 'unpublished'];
    const post = await Post.findOne({
      include: [{ model: User, as: 'author', attributes: { exclude: ['password'] } }],
      where: { id: postId },
      status: { [Op.not]: 'deleted' }
    });
    if (!post) {
      return res.status(404).json({ status: 404, message: 'The post does not exist' });
    }

    // Checks if the user is not admin and if the post is a draft or unpublished post from another user
    if (
      currentUser &&
      post.get().userId !== currentUser.id &&
      currentUser.userType !== 'admin' &&
      protectedStatus.indexOf(post.get().status) > -1
    ) {
      return res.status(401).json({ status: 401, message: 'Unauthorized access' });
    }

    return res.status(200).json({ status: 200, data: post.get() });
  }

  /**
   * @author Caleb
   * */
  static async commentPost(req, res) {
    const { body } = req;
    const { currentUser } = req.body;
    const user = currentUser.id;
    const { postId } = req.params;
    const post = await Post.findOne({ where: { id: postId, status: 'published' } });

    if (!post) {
      return res.status(404).json({ status: 404, message: 'The post does not exist' });
    }
    const postComment = await Comment.create({
      userId: user,
      postId,
      ...body,
      status: 'active'
    });
    return res
      .status(201)
      .json({ status: 201, message: 'Comment created successfully', data: postComment.get() });
  }

  /**
   * @author Caleb
   * */
  static async viewComment(req, res) {
    const { postId } = req.params;
    const post = await Post.findOne({
      attributes: ['title'],
      where: { id: postId, status: 'published' }
    });

    if (!post) {
      return res.status(404).json({ status: 404, message: 'The post does not exist' });
    }
    const comment = await Comment.findAll({
      include: [{ model: User, attributes: ['id', 'avatar', 'firstName', 'lastName'] }],
      where: { postId }
    });

    return res.status(200).json({ status: 200, data: comment });
  }

  /**
   * @author Olivier
   * */
  static async deletePost(req, res) {
    const { currentUser } = req.body;
    const { postId } = req.params;

    const post = await Post.findOne({ where: { id: postId, status: { [Op.not]: 'deleted' } } });
    if (!post) {
      return res.status(404).json({ status: 404, message: 'The post does not exist' });
    }

    if (post.get().userId !== currentUser.id) {
      return res.status(401).json({ status: 401, message: 'Unauthorized action' });
    }

    await post.update({ status: 'deleted', updatedAt: moment().format() });

    return res.status(200).json({ status: 200, message: 'The post was deleted successfully' });
  }

  /**
   * @author Olivier
   * */
  static async publishPost(req, res) {
    const { currentUser } = req.body;
    const { postId } = req.params;
    const post = await Post.findOne({
      include: [{ model: User, as: 'author', attributes: { exclude: ['password'] } }],
      where: { id: postId },
      status: { [Op.not]: 'deleted' }
    });

    if (!post) {
      return res.status(404).json({ status: 404, message: 'The post does not exist' });
    }

    // Checks if the user is not admin and if the post is a draft or unpublished post from another user
    if (post.get().userId !== currentUser.id) {
      return res.status(401).json({ status: 401, message: 'Unauthorized access' });
    }

    const status = post.get().status === 'published' ? 'unpublished' : 'published';

    await post.update({ status, updatedAt: moment().format() });

    return res.status(200).json({ status: 200, message: `The post was ${status} successfully` });
  }

  /**
   * @author Chris
   * @decription Method to update a blog post: this updates the title and text of the post
   * */
  static async editPost(req, res) {
    const { postId } = req.params;
    const { currentUser, title, text } = req.body;

    const post = await Post.findOne({
      include: [
        {
          model: User,
          as: 'author',
          attributes: { exclude: ['password'] }
        }
      ],
      where: {
        id: postId
      },
      status: { [Op.not]: 'deleted' }
    });

    if (!post) {
      return res.status(404).send({ status: 404, message: 'The post does not exist' });
    }

    if (post.get().userId !== currentUser.id) {
      return res.status(401).send({ status: 401, message: 'Unauthorized access' });
    }

    await post.update({ title, text, updatedAt: moment().format() });

    return res.status(200).send({ message: 'The post was updated successfully' });
  }
  /**
   * @author Daniel
   * @description method to delete a comment
   * @param {object} req
   * @param {object} res
   */

  static async deleteComment(req, res) {
    const { id, postId } = req.params;
    const { currentUser } = req.body;
    const comment = await Comment.findOne({
      where: {
        id,
        postId,
        status: { [Op.not]: 'deleted' }
      }
    });
    if (!comment) {
      return res.status(404).send({ message: 'The comment does not exist' });
    }
    if (comment.get().userId !== currentUser.id) {
      return res.status(401).send({ status: 401, message: 'Unauthorized access' });
    }

    await comment.update({ status: 'deleted', updatedAt: moment().format() });

    return res.status(200).send({ status: 200, message: 'The comment was deleted successfully' });
  }

  static async getAllPosts(req, res) {
    const { limit = 20, offset: offsetQuery = 0, page: queryPage } = req.query;

    const offset = queryPage ? queryPage - 1 : offsetQuery;
    const page = queryPage || offset + 1;

    const posts = await Post.findAndCountAll({
      include: [{ model: User, as: 'author', attributes: { exclude: ['password'] } }],
      offset: offset * limit,
      where: { status: { [Op.not]: ['deleted', 'unpublished'] } },
      limit
    });

    return res.status(200).json({
      status: 200,
      posts: posts.rows,
      postsCount: posts.count,
      pages: Math.ceil(posts.count / limit),
      page
    });
  }
}
