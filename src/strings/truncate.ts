/**
 * Truncates a string to a maximum length, appending a suffix.
 *
 * @param str - The string to truncate
 * @param maxLength - The maximum length of the result (including suffix)
 * @param suffix - The suffix to append when truncated (default: '...')
 * @returns The truncated string
 *
 * @example
 * ```typescript
 * truncate('Hello, World!', 8); // 'Hello...'
 * truncate('Hello, World!', 10, '…'); // 'Hello, Wo…'
 * truncate('Hi', 10); // 'Hi'
 * ```
 *
 * @throws {TypeError} When first argument is not a string
 * @throws {RangeError} When maxLength is not a non-negative integer
 */
export function truncate(
  str: string,
  maxLength: number,
  suffix: string = '...',
): string {
  if (typeof str !== 'string') {
    throw new TypeError('First argument must be a string');
  }
  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new RangeError('maxLength must be a non-negative integer');
  }
  if (typeof suffix !== 'string') {
    throw new TypeError('suffix must be a string');
  }

  if (str.length <= maxLength) {
    return str;
  }

  if (maxLength <= suffix.length) {
    return suffix.slice(0, maxLength);
  }

  return str.slice(0, maxLength - suffix.length) + suffix;
}
