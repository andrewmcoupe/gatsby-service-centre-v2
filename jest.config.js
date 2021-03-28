module.exports = {
  automock: false,
  preset: 'ts-jest',
  globals: {},
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
}
