/**
 * Zips multiple arrays together into an array of tuples.
 * Uses the length of the shortest array.
 *
 * @template T - The element type
 * @param arrays - The arrays to zip
 * @returns An array of tuples
 *
 * @example
 * ```typescript
 * zip([1, 2, 3], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b'], [3, 'c']]
 * zip([1, 2], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b']]
 * ```
 *
 * @throws {TypeError} When any argument is not an array
 */
export function zip<T>(...arrays: T[][]): T[][] {
  for (const arr of arrays) {
    if (!Array.isArray(arr)) {
      throw new TypeError('All arguments must be arrays');
    }
  }

  if (arrays.length === 0) {
    return [];
  }

  const minLength = Math.min(...arrays.map((arr) => arr.length));
  const result: T[][] = [];

  for (let i = 0; i < minLength; i++) {
    result.push(arrays.map((arr) => arr[i]));
  }

  return result;
}
