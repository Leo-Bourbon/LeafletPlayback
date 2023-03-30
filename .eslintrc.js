module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    L: "writable",
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-var": "error",
  },
};
