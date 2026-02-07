/**
 * Returns the symmetric difference between two arrays (elements in either but not both).
 *
 * @template T - The element type
 * @param a1 - First array
 * @param a2 - Second array
 * @returns Array of elements present in only one of the two arrays
 *
 * @example
 * ```typescript
 * getDifferenceArray([1, 2, 3], [2, 3, 4]); // [1, 4]
 * getDifferenceArray(['a', 'b'], ['b', 'c']); // ['a', 'c']
 * ```
 *
 * @throws {TypeError} When arguments are not arrays
 */
export function getDifferenceArray<T>(a1: T[], a2: T[]): T[] {
  if (!Array.isArray(a1) || !Array.isArray(a2)) {
    throw new TypeError('Both arguments must be arrays');
  }

  const set1 = new Set(a1);
  const set2 = new Set(a2);
  const diff: T[] = [];

  for (const item of set1) {
    if (!set2.has(item)) {
      diff.push(item);
    }
  }

  for (const item of set2) {
    if (!set1.has(item)) {
      diff.push(item);
    }
  }

  return diff;
}
