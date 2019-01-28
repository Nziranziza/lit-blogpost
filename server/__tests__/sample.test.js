describe('Sample test', () => {
  test('add two numbers', () => {
    const add = jest.fn((a, b) => a + b);
    expect(add(1, 2)).toBe(3);
  });
});
