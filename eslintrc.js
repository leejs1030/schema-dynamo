module.exports = {
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    strict: 0,
    quotes: ['error', 'single', { avoidEscape: true }],
    'max-len': ['error', { code: 150 }],
    'prettier/prettier': 'error',
    'require-await': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/require-await': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/no-var-requires': 0
  },
  overrides: [
    {
      files: '**/*.ts',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: '../tsconfig.json',
      },
    },
  ],
};