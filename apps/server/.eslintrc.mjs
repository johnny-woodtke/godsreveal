/** @type {import("eslint").Linter.Config} */
export default {
    root: true,
    extends: ["@godsreveal/eslint-config/base.mjs"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: true,
    },
  };
  