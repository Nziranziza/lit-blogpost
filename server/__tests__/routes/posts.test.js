import request from 'supertest';
import { urlPrefix } from '../mocks/variables.json';
import { User, Post } from '../../src/database/models';
import { user, post } from '../mocks/db.json';
import app from '../../src/server';

let testUser;
let testUserToken;
let testPost;
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
  });

  afterAll(async () => {
    await User.destroy({
      where: { email: user.email }
    });
    await Post.destroy({
      where: { userId: testUser.id }
    });
  });

  test('viewPost', async () => {
    expect.assertions(2);
    const res = await request(app)
      .get(`${urlPrefix}/posts/${testPost.id}`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });

  test('deletePost', async () => {
    expect.assertions(2);
    const res = await request(app)
      .delete(`${urlPrefix}/posts/${testPost.id}`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
  });
});
