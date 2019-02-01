import { User, Post } from '../../src/database/models';
import { user, post } from '../mocks/db.json';

let testUser;
let testPost;
describe('User model', () => {
  beforeAll(async () => {
    const res = await User.create({
      ...user
    });
    testUser = res.get();
  });

  afterAll(async () => {
    await User.destroy({
      where: { email: user.email }
    });
    await Post.destroy({
      where: { id: testPost.id }
    });
  });

  test('Create a post', async () => {
    expect.assertions(1);
    const res = await Post.create({
      ...post,
      userId: testUser.id
    });
    testPost = res.get();
    expect(res.get().title).toBe(post.title);
  });

  test('Find a post', async () => {
    expect.assertions(1);
    const res = await Post.findOne({ where: { title: post.title } });
    expect(res.get().title).toBe(post.title);
  });

  test('Update a user', async () => {
    expect.assertions(1);
    const [, userData] = await Post.update(
      { title: 'Test Update' },
      { where: { id: testPost.id }, returning: true, plain: true }
    );
    expect(userData.title).toBe('Test Update');
  });

  test('Delete a post', async () => {
    expect.assertions(1);
    const res = await Post.destroy({ where: { id: testPost.id } });
    expect(res).toBe(1);
  });
});
