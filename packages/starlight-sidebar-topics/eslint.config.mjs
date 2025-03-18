import hideoo from '@hideoo/eslint-config'

export default hideoo(
  {
    ignores: ['eslint.config.mjs'],
    languageOptions: {
      parserOptions: {
        project: ['../../tsconfig.json'],
      },
    },
  },
  {
    rules: {
      'unicorn/prefer-dom-node-text-content': 'off',
    },
  },
  {
    files: ['index.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
)
