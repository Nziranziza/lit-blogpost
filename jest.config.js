module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    'index.js',
    'server.js',
    'database',
    'middlewares',
    '__tests__',
    'jest.config.js'
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js']
};
