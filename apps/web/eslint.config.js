/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@mijikai/eslint-config/next.js"],
  parserOptions: {
    project: true,
  },
};
