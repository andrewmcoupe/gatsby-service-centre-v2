module.exports = {
  automock: false,
  preset: 'ts-jest',
  globals: {
    // A set of global variables that need to be available in all test environments.
  },
  testEnvironment: 'jsdom', // or node
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
}
