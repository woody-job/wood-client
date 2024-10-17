module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react'],
          ['^react-router-dom', '^react-router'],
          ['^react-redux', '^@reduxjs/toolkit'],
          ['^@mui/'],
          ['^@/app', '^@/pages', '^@/widgets', '^@/features', '^@/entities', '^@/shared'],
        ],
      },
    ],
  },
}
