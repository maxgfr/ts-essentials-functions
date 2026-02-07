/**
 * Groups array elements by a key derived from each element.
 *
 * @template T - The element type
 * @template K - The key type (must be a valid property key)
 * @param array - The array to group
 * @param keyFn - Function that extracts the grouping key from each element
 * @returns A Map of grouped elements
 *
 * @example
 * ```typescript
 * const users = [
 *   { name: 'Alice', role: 'admin' },
 *   { name: 'Bob', role: 'user' },
 *   { name: 'Charlie', role: 'admin' },
 * ];
 * const grouped = groupBy(users, (u) => u.role);
 * // Map { 'admin' => [Alice, Charlie], 'user' => [Bob] }
 * ```
 *
 * @throws {TypeError} When first argument is not an array
 */
export function groupBy<T, K extends PropertyKey>(
  array: T[],
  keyFn: (item: T) => K,
): Map<K, T[]> {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }

  const result = new Map<K, T[]>();

  for (const item of array) {
    const key = keyFn(item);
    const group = result.get(key);
    if (group) {
      group.push(item);
    } else {
      result.set(key, [item]);
    }
  }

  return result;
}
