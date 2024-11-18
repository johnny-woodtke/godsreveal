/** @type {import("eslint").Linter.Config} */
export default {
  root: true,
  extends: ["@godsreveal/eslint-config/next.mjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
