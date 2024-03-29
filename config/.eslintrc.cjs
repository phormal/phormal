module.exports = {
  ignorePatterns: [
    'vite-env.d.ts',
    'rollup.config.js',
    'next.config.js',
    'tests/pages/**/*',
  ],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
};