import { User } from '../../src/database/models';
import { user } from '../mocks/db.json';

describe('User model', () => {
  beforeAll(() => {
    return User.destroy({
      where: { email: user.email }
    });
  });

  test('Create a user', () => {
    expect.assertions(1);
    return User.create({ ...user }).then(res => {
      expect(res.get()).toHaveProperty('email', user.email);
    });
  });

  test('Find a user', () => {
    expect.assertions(1);
    return User.findOne({ where: { email: user.email } }).then(res => {
      expect(res.get()).toHaveProperty('email', user.email);
    });
  });

  test('Update a user', () => {
    expect.assertions(1);
    return User.update(
      { firstName: 'Olivier' },
      { where: { email: user.email }, returning: true, plain: true }
    ).then(res => {
      const [, userData] = res;
      expect(userData.firstName).toBe('Olivier');
    });
  });

  test('Delete a user', () => {
    expect.assertions(1);
    return User.destroy({ where: { email: user.email } }).then(res => {
      expect(res).toBe(1);
    });
  });
});
