// eslint.config.js

export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
