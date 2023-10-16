/**
 * A helper function to replace https:// prefix
 * @param {string} str
 * @return {string} replaced https string
 */
export function replaceHttpPrefix(str: string): string {
  return str.replace(/^https?\:\/\//gi, "");
}
