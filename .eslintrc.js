module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'prettier'],
  settings: {
    // support typescript files
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    // support import of ts, tsx files
    'import/resolver': {
      "typescript": {
        "alwaysTryTypes": true // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    // support import of ts, tsx files
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    // fix props typescript import issue
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    // ignore storybook and test devdependencies error
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'src/**/*.spec.ts*',
          'src/setupTests.ts',
          '.storybook/**',
          'src/stories/**' 
        ]
      }
    ]
  },
};
