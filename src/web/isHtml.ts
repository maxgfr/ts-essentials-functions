/**
 * Checks if a string contains HTML markup.
 *
 * @param input - The string to check
 * @returns True if the string contains HTML tags or entities
 *
 * @example
 * ```typescript
 * isHTML('<p>Hello</p>'); // true
 * isHTML('Hello world'); // false
 * isHTML('&amp;'); // true
 * ```
 */
export function isHTML(input: string): boolean {
  return /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(input);
}
