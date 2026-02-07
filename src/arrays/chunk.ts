/**
 * Splits an array into chunks of a specified size.
 *
 * @template T - The element type
 * @param array - The array to split
 * @param size - The maximum size of each chunk
 * @returns An array of chunks
 *
 * @example
 * ```typescript
 * chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3], 3); // [[1, 2, 3]]
 * ```
 *
 * @throws {TypeError} When first argument is not an array
 * @throws {RangeError} When size is not a positive integer
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }
  if (!Number.isInteger(size) || size < 1) {
    throw new RangeError('Size must be a positive integer');
  }

  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}
