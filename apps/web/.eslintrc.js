/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@godsreveal/eslint-config/next.js",
    "plugin:@tanstack/query/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  globals: {
    Bun: true,
  },
};
