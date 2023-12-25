/**
 * A helper function to replace https:// prefix
 * @param {string} str
 * @return {string} replaced https string
 */
export const replaceHttpsPrefix = (str: string): string =>
  str.replace(/^https?\:\/\//gi, "");
