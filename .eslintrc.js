module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:require-extensions/recommended',
    ],
    plugins: ['@typescript-eslint', 'require-extensions'],
    parserOptions: {
      ecmaVersion: 2020, // Adjust according to your project's target ES version
      sourceType: 'module',
      project: './tsconfig.json', // Path to your tsconfig file
    },
    env: {
      node: true,
    },
    rules: {
      // Add your custom ESLint rules here (optional)
    },
};
  