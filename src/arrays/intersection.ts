/**
 * Returns elements present in both arrays, without duplicates.
 *
 * @template T - The element type
 * @param a1 - The first array
 * @param a2 - The second array
 * @returns A new array of common elements
 *
 * @example
 * ```typescript
 * intersection([1, 2, 3, 4], [3, 4, 5, 6]); // [3, 4]
 * intersection([1, 2], [3, 4]); // []
 * ```
 *
 * @throws {TypeError} When either argument is not an array
 */
export function intersection<T>(a1: T[], a2: T[]): T[] {
  if (!Array.isArray(a1) || !Array.isArray(a2)) {
    throw new TypeError('Both arguments must be arrays');
  }

  const set2 = new Set(a2);
  const seen = new Set<T>();
  const result: T[] = [];

  for (const item of a1) {
    if (set2.has(item) && !seen.has(item)) {
      seen.add(item);
      result.push(item);
    }
  }

  return result;
}
