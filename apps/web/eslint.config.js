/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@web/eslint-config/next.js"],
  parserOptions: {
    project: true,
  },
};
