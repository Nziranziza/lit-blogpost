import request from 'supertest';
import { urlPrefix } from '../mocks/variables.json';
import app from '../../src/server';

// Test for view posts of a user API.
describe('users', () => {
  test('viewPosts', async () => {
    const res = await request(app).get(
      `${urlPrefix}/users/d00b90eb-605a-485e-91ad-d1bb83bf3ab0/posts`
    );
    expect(res.status).toBe(401);
  });
});
