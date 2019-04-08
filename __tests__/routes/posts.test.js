import request from 'supertest';
import { urlPrefix } from '../mocks/variables.json';
import { User, Post, Token, Comment } from '../../database/models';
import { user, post, comment, user1 } from '../mocks/db.json';
import app from '../../server';

let testUser;
let testUserToken;
let testUser1Token;
let testPost;
let testComment;
const fakePostId = '6987cfd0-f814-45af-9950-819934ec97c8';
describe('posts', () => {
  beforeAll(async () => {
    const { body } = await request(app)
      .post(`${urlPrefix}/auth/signup`)
      .send({ ...user });
    testUser = body.data;
    testUserToken = body.token;
    const res = await Post.create({
      ...post,
      userId: testUser.id
    });
    testPost = res.get();
    const userOne = await request(app)
      .post(`${urlPrefix}/auth/signup`)
      .send({ ...user1 });
    testUser1Token = userOne.body.token;
    const resComment = await Comment.create({
      ...comment,
      userId: testUser.id,
      postId: testPost.id,
      status: 'active'
    });
    testComment = resComment.get();
  });

  afterAll(async () => {
    await User.destroy({
      where: { email: user.email }
    });
    await Token.destroy({
      where: { token: testUserToken }
    });
    await Post.destroy({
      where: { userId: testUser.id }
    });
    await Comment.destroy({
      where: { userId: testUser.id }
    });
    await User.destroy({
      where: { email: user1.email }
    });
  });

  test('should return `The post does not exist`', async () => {
    expect.assertions(3);
    const res = await request(app)
      .get(`${urlPrefix}/posts/${fakePostId}`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe(404);
    expect(res.body.message).toBe('The post does not exist');
  });

  test('viewPost - should return `Unauthorized access`', async () => {
    expect.assertions(3);
    const res = await request(app)
      .get(`${urlPrefix}/posts/${testPost.id}`)
      .set('Authorization', `Bearer ${testUser1Token}`);

    expect(res.status).toBe(401);
    expect(res.body.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized access');
  });

  test('viewPost - should return a single post', async () => {
    expect.assertions(2);
    const res = await request(app)
      .get(`${urlPrefix}/posts/${testPost.id}`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  test('publishPost should return `The post does not exist`', async () => {
    expect.assertions(3);
    const res = await request(app)
      .put(`${urlPrefix}/posts/${fakePostId}/publish`)
      .set('Authorization', `Bearer ${testUser1Token}`);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe(404);
    expect(res.body.message).toBe('The post does not exist');
  });

  test('publishPost should return `Unauthorized access`', async () => {
    expect.assertions(3);
    const res = await request(app)
      .put(`${urlPrefix}/posts/${testPost.id}/publish`)
      .set('Authorization', `Bearer ${testUser1Token}`);

    expect(res.status).toBe(401);
    expect(res.body.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized access');
  });
  test('publishPost', async () => {
    expect.assertions(2);
    const res = await request(app)
      .put(`${urlPrefix}/posts/${testPost.id}/publish`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  test('commentPost', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/posts/${testPost.id}/comments`)
      .set('Authorization', `Bearer ${testUserToken}`)
      .send({ text: 'comment test' });
    expect(res.status).toBe(201);
  });

  test('viewComment', async () => {
    const res = await request(app)
      .get(`${urlPrefix}/posts/${testPost.id}/comments`)
      .set('Authorization', `Bearer ${testUserToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  test('commentPost-not token', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/posts/${testPost.id}/comments`)
      .send({ text: 'comment test' });

    expect(res.status).toBe(401);
  });

  test('should return `The post does not exist`', async () => {
    expect.assertions(3);
    const res = await request(app)
      .delete(`${urlPrefix}/posts/6987cfd0-f814-45af-9950-819934ec97c8`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe(404);
    expect(res.body.message).toBe('The post does not exist');
  });

  test('should return `Unauthorized action`', async () => {
    expect.assertions(3);
    const res = await request(app)
      .delete(`${urlPrefix}/posts/${testPost.id}`)
      .set('Authorization', `Bearer ${testUser1Token}`);

    expect(res.status).toBe(401);
    expect(res.body.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized action');
  });

  test('deletePost', async () => {
    expect.assertions(2);
    const res = await request(app)
      .delete(`${urlPrefix}/posts/${testPost.id}`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  test('commentPost- after delete', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/posts/${testPost.id}/comments`)
      .set('Authorization', `Bearer ${testUserToken}`)
      .send({ text: 'comment test' });
    expect(res.status).toBe(404);
  });

  test('viewComment- after post delete', async () => {
    const res = await request(app)
      .get(`${urlPrefix}/posts/${testPost.id}/comments`)
      .set('Authorization', `Bearer ${testUserToken}`);
    expect(res.status).toBe(404);
    expect(res.body).toBeDefined();
  });

  test('editPost', async () => {
    expect.assertions(3);
    const res = await request(app)
      .put(`${urlPrefix}/posts/${fakePostId}`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(404);
    expect(res.body.status).toBe(404);
    expect(res.body.message).toBe('The post does not exist');
  });

  test('editPost - should return `Unauthorized access`', async () => {
    expect.assertions(3);
    const res = await request(app)
      .put(`${urlPrefix}/posts/${testPost.id}`)
      .set('Authorization', `Bearer ${testUser1Token}`);

    expect(res.status).toBe(401);
    expect(res.body.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized access');
  });

  test('editPost', async () => {
    expect.assertions(2);
    const res = await request(app)
      .put(`${urlPrefix}/posts/${testPost.id}`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  test('postBlogpost', async () => {
    expect.assertions(2);
    const res = await request(app)
      .post(`${urlPrefix}/posts`)
      .set('Authorization', `Bearer ${testUserToken}`)
      .send(post);

    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
  });
  test('deleteComment --without ownership', async () => {
    const res = await request(app)
      .delete(`${urlPrefix}/posts/${testPost.id}/comments/${testComment.id}`)
      .set('Authorization', `Bearer ${testUser1Token}`);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized access');
  });
  test('deleteComment', async () => {
    const res = await request(app)
      .delete(`${urlPrefix}/posts/${testPost.id}/comments/${testComment.id}`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('The comment was deleted successfully');
  });
  test('deleteComment --when is deleted', async () => {
    const res = await request(app)
      .delete(`${urlPrefix}/posts/${testPost.id}/comments/${testComment.id}`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('The comment does not exist');
  });
});
