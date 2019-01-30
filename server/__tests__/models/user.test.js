import { User } from '../../src/database/models';
import { user } from '../mocks/db.json';

describe('User model', () => {
  beforeAll(() => {
    return User.destroy({
      where: { email: user.email }
    }).then(() => true);
  });

  test('Create a user', () => {
    return User.create({ ...user }).then(res => {
      expect(res.get()).toHaveProperty('email', user.email);
    });
  });

  test('Find a user', () => {
    return User.find({ where: { email: user.email } }).then(res => {
      expect(res.get()).toHaveProperty('email', user.email);
    });
  });

  test('Update a user', () => {
    return User.update(
      { firstName: 'Olivier' },
      { where: { email: user.email }, returning: true, plain: true }
    ).then(res => {
      expect(res[0]).toBe(1);
    });
  });

  test('Delete a user', () => {
    return User.destroy({ where: { email: user.email } }).then(res => {
      expect(res).toBe(1);
    });
  });
});
