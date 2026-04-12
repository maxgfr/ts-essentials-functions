/**
 * Removes duplicate elements from an array based on a key function.
 * Keeps the first occurrence of each unique key.
 *
 * @template T - The element type
 * @param array - The array to deduplicate
 * @param keyFn - Function to extract the key for comparison
 * @returns A new array with duplicates removed
 *
 * @example
 * ```typescript
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice (duplicate)' },
 * ];
 * uniqueBy(users, (u) => u.id); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 * ```
 *
 * @throws {TypeError} When first argument is not an array
 * @throws {TypeError} When second argument is not a function
 */
export function uniqueBy<T>(array: T[], keyFn: (item: T) => unknown): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }
  if (typeof keyFn !== 'function') {
    throw new TypeError('Second argument must be a function');
  }

  const seen = new Set<unknown>();
  const result: T[] = [];

  for (const item of array) {
    const key = keyFn(item);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}
