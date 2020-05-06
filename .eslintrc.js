/**@type {import("eslint").Linter.BaseConfig} */
module.exports = {
  root: true,
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.base.js',
      },
    },
  },
  env: {
    es6: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    extraFileExtensions: ['.ts'],
    allowImportExportEverywhere: true,
    codeFrame: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  "plugins": ["@typescript-eslint"],
  extends: [
    "plugin:react/recommended",
    // eslint-config-airbnb-base
    'airbnb-base',
    // 'prettier',
    // https://egoist.moe/2017/12/11/write-better-code-with-eslint-and-prettier/
    'plugin:prettier/recommended',
  ],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ],
    // 'prettier/prettier': 'error',
    'no-console': 0,
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
  },
};
