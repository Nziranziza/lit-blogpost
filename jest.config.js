module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coveragePathIgnorePatterns: [
    'node_modules',
    'server/src/index.js',
    'server/src/server.js',
    'server/src/database',
    'server/__tests__'
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['server/src/**/*.js']
};
