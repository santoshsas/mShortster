module.exports = {
  // Indicates that the root of your project is the src folder
  roots: ['./'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // Setup files before running tests
  setupFiles: ['dotenv/config'],

  // The test runner Jest will use
  testRunner: 'jest-circus/runner',

  // Jest transform configuration to handle TypeScript files
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // File patterns that Jest should ignore
  testPathIgnorePatterns: ['/node_modules/'],

  // The file extensions that Jest should consider when looking for test files
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Setting up coverage report
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**', '!**/__tests__/**'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
