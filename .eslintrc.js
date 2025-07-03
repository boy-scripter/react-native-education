module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@/graphql/generated',
            message: 'Do not import from secret directly. Use public API instead.',
          },
        ],
      },
    ],
  },
};
