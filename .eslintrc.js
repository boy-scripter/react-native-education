module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // ❌ Disallow direct import from generated GraphQL
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@/graphql/generated',
            message: 'Do not import from generated folder directly. Use public API instead.',
          },
        ],
      },
    ],

    // ❌ Warn on bad Date usage
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'NewExpression[callee.name="Date"]',
        message: 'Use ISO date strings or DateTime.fromISO() instead of new Date()',
      },
      {
        selector: "CallExpression[callee.object.name='Date'][callee.property.name='parse']",
        message: 'Avoid Date.parse. Use DateTime.fromISO() or a validated ISO string.',
      },
    ],
  },

  overrides: [
    {
      files: ['store/**/*.ts', 'store/**/*.tsx'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
};
