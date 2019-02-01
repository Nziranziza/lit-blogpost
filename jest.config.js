module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coveragePathIgnorePatterns: ['node_modules', 'server/src/database'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['server/src/**/*.js']
};
