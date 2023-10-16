export function replaceHttpPrefix(str: string): string {
  return str.replace(/^https\:\/\/.*$/, "");
}
