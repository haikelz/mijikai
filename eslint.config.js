/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@web/eslint-config/library.js"],
  parserOptions: {
    project: true,
  },
};
