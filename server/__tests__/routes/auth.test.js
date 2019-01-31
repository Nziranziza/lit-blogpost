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

  test('login- pass', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/auth/login`)
      .send({ email: 'test@email.com', password: 'test@test' });
    expect(res.statusCode).toBe(200);
  });
  test('login- user not found', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/auth/login`)
      .send({ email: 'fake@email.com', password: 'test@test' });
    expect(res.statusCode).toBe(404);
  });

  test('login-wrong password', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/auth/login`)
      .send({ email: 'test@email.com', password: 'fake@fake' });
    expect(res.statusCode).toBe(401);
  });
});
