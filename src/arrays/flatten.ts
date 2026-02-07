/**
 * Flattens a nested array to the specified depth.
 *
 * @template T - The target element type
 * @param array - The nested array to flatten
 * @param depth - Maximum depth to flatten (default: 1)
 * @returns A new flattened array
 *
 * @example
 * ```typescript
 * flatten([1, [2, [3, [4]]]]); // [1, 2, [3, [4]]]
 * flatten([1, [2, [3, [4]]]], Infinity); // [1, 2, 3, 4]
 * flatten([1, [2, 3], [4, [5]]], 2); // [1, 2, 3, 4, 5]
 * ```
 *
 * @throws {TypeError} When first argument is not an array
 */
export function flatten<T>(array: unknown[], depth = 1): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }

  const result: unknown[] = [];

  const flattenRecursive = (arr: unknown[], currentDepth: number): void => {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth < depth) {
        flattenRecursive(item, currentDepth + 1);
      } else {
        result.push(item);
      }
    }
  };

  flattenRecursive(array, 0);
  return result as T[];
}
