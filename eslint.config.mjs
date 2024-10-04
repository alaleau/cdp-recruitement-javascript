export default [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
    ],
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
  },
];
