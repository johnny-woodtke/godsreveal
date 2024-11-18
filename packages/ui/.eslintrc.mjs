/** @type {import("eslint").Linter.Config} */
export default {
  root: true,
  extends: ["@godsreveal/eslint-config/react-internal.mjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
};
