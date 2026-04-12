/**
 * Reverses a string.
 *
 * @param str - The string to reverse
 * @returns The reversed string
 *
 * @example
 * ```typescript
 * reverse('hello'); // 'olleh'
 * reverse('abc'); // 'cba'
 * ```
 *
 * @throws {TypeError} When argument is not a string
 */
export function reverse(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Argument must be a string');
  }

  return [...str].reverse().join('');
}
