/**
 * Splits an array into two groups based on a predicate function.
 *
 * @template T - The element type
 * @param array - The array to partition
 * @param predicate - Function that returns true for elements in the first group
 * @returns A tuple of [matching, nonMatching] arrays
 *
 * @example
 * ```typescript
 * const [evens, odds] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
 * // evens: [2, 4], odds: [1, 3, 5]
 * ```
 *
 * @throws {TypeError} When first argument is not an array
 */
export function partition<T>(
  array: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] {
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }

  const matching: T[] = [];
  const nonMatching: T[] = [];

  for (const item of array) {
    if (predicate(item)) {
      matching.push(item);
    } else {
      nonMatching.push(item);
    }
  }

  return [matching, nonMatching];
}
