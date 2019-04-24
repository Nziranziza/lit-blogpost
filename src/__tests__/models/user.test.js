import { User } from '../../database/models';
import { user } from '../mocks/db.json';

describe('User model', () => {
  beforeAll(async () => {
    await User.destroy({
      where: { email: user.email }
    });
  });

  test('Create a user', async () => {
    expect.assertions(1);
    const res = await User.create({ ...user });
    expect(res.get()).toHaveProperty('email', user.email);
  });

  test('Find a user', async () => {
    expect.assertions(1);
    const res = await User.findOne({ where: { email: user.email } });
    expect(res.get()).toHaveProperty('email', user.email);
  });

  test('Update a user', async () => {
    expect.assertions(1);
    const [, userData] = await User.update(
      { firstName: 'Olivier' },
      { where: { email: user.email }, returning: true, plain: true }
    );
    expect(userData.firstName).toBe('Olivier');
  });

  test('Delete a user', async () => {
    expect.assertions(1);
    const res = await await User.destroy({ where: { email: user.email } });
    expect(res).toBe(1);
  });
});
