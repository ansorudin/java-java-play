module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'no-restricted-imports': [
          'error',
          {
            patterns: ['~/features/*/*'],
          },
        ],
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': 'warn',
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-inline-styles': 0,
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'react/jsx-curly-brace-presence': ['error', { props: 'never' }],
        radix: 'off',
      },
    },
  ],
};
