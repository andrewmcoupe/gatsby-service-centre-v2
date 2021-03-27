module.exports = {
  automock: false,
  preset: 'ts-jest',
  globals: {},
  testEnvironment: 'jsdom', // or node
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
}
