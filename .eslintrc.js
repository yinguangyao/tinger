module.exports = {
  root: true,
  extends: ['react-app', 'plugin:prettier/recommended', 'plugin:jsx-a11y/recommended'],
  rules: {
    'import/no-dynamic-require': 'warn',
    'import/extensions': 'off',
    'react/jsx-indent': 'warn',
    'react-hooks/exhaustive-deps': 'warn',

    '@typescript-eslint/no-unused-vars': 'warn', // to error
    'prettier/prettier': 'warn', // to error
    'react-hooks/rules-of-hooks': 'error',

    'no-useless-constructor': 'off',
    'prefer-template': 'off',

    'react/sort-comp': 'off',
    'react/no-unescaped-entities': 'warn',
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks', '@typescript-eslint', 'jsx-a11y'],
}
