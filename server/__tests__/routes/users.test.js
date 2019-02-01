import request from 'supertest';
import { urlPrefix } from '../mocks/variables.json';
import { User, Post } from '../../src/database/models';
import { user, post } from '../mocks/db.json';
import app from '../../src/server';

let testUser;
let testUserToken;
let testPost;
describe('users', () => {
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

  test('viewUserPosts', async () => {
    expect.assertions(3);
    const res = await request(app)
      .get(`${urlPrefix}/users/${testUser.id}/posts`)
      .set('Authorization', `Bearer ${testUserToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.data).toBeDefined();
  });
});
