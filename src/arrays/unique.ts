/**
 * Removes duplicate values from an array using strict equality.
 *
 * @template T - The element type
 * @param array - The array to deduplicate
 * @returns A new array with duplicates removed
 *
 * @example
 * ```typescript
 * unique([1, 2, 2, 3, 3, 3]); // [1, 2, 3]
 * unique(['a', 'b', 'a']); // ['a', 'b']
 * ```
 *
 * @throws {TypeError} When first argument is not an array
 */
export function unique<T>(array: T[]): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }

  return [...new Set(array)];
}
