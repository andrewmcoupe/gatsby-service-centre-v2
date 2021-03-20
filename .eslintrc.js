module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0, // TypeScript is pretty good at inferring return types
    '@typescript-eslint/explicit-module-boundary-types': 0, // TypeScript is pretty good at inferring return types
    'no-console': 1, // Avoid leaving console logs behind
    'prefer-template': 1, // Prefer template strings
  },
}
