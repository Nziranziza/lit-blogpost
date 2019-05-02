import request from 'supertest';
import { User } from '../../database/models';
import { user } from '../mocks/db.json';
import { urlPrefix } from '../mocks/variables.json';
import app from '../../server';

describe('auth', () => {
  beforeAll(async () => {
    await User.destroy({
      where: { email: user.email }
    }).then(() => true);
  });

  afterAll(async () => {
    await User.destroy({
      where: { email: user.email }
    }).then(() => true);
  });

  test('signup', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/auth/signup`)
      .send({ ...user });
    expect(res.body).toBeDefined();
    expect(res.status).toBe(201);
  });

  test('login- pass', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/auth/login`)
      .send({ email: 'test@email.com', password: 'test@test' });
    expect(res.status).toBe(200);
  });

  test('login- user not found', async () => {
    const res = await request(app)
      .post(`${urlPrefix}/auth/login`)
      .send({ email: 'fake@email.com', password: 'test@test' });
    expect(res.status).toBe(401);
  });

  test('login- wrong password', async () => {
    expect.assertions(1);
    const res = await request(app)
      .post(`${urlPrefix}/auth/login`)
      .send({ email: 'test@email.com', password: 'fake@fake' });
    expect(res.status).toBe(401);
  });
});
