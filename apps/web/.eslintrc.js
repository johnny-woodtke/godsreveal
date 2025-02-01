/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@godsreveal/eslint-config/next"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  globals: {
    Bun: true,
  },
};
