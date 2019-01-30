import { User } from '../../src/database/models';
import { user } from '../mocks/db.json';

describe('User model', () => {
  beforeAll(() => {
    return User.destroy({
      where: { email: user.email }
    })
      .then(() => true)
      .catch(err => console.log('before all', err));
  });

  test.only('Create a user', () => {
    return User.create({ ...user })
      .then(res => {
        expect(res.get()).toHaveProperty('email', user.email);
      })
      .catch(err => console.log('create test', err));
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
      const [, userData] = res;
      expect(userData.firstName).toBe('Olivier');
    });
  });

  test('Delete a user', () => {
    return User.destroy({ where: { email: user.email } }).then(res => {
      expect(res).toBe(1);
    });
  });
});
