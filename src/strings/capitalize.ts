/**
 * Capitalizes the first letter of a string and lowercases the rest.
 *
 * @param str - The string to capitalize
 * @returns The capitalized string
 *
 * @example
 * ```typescript
 * capitalize('hello'); // 'Hello'
 * capitalize('HELLO'); // 'Hello'
 * capitalize('hELLO WORLD'); // 'Hello world'
 * ```
 *
 * @throws {TypeError} When argument is not a string
 */
export function capitalize(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Argument must be a string');
  }

  if (str.length === 0) {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
