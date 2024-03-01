/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@mijikai/eslint-config/library.js"],
  parserOptions: {
    project: true,
  },
};
