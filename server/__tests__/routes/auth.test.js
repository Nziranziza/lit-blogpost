import request from 'supertest';
import { User } from '../../src/database/models';
import { user } from '../mocks/db.json';
import { urlPrefix } from '../mocks/variables.json';
import app from '../../src/server';

console.log('Checking');
describe('auth', () => {
  beforeAll(() => {
    console.log('before');
    return User.destroy({
      where: { email: user.email }
    }).then(() => true);
  });

  afterAll(() => {
    return User.destroy({
      where: { email: user.email }
    }).then(() => true);
  });

  test('signup', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/auth/signup`)
      .send({ ...user });
    expect(res.statusCode).toBe(201);
  });
});
