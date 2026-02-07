/**
 * Interleaves two arrays of equal length into a single array.
 * Elements alternate between the two arrays: [a[0], b[0], a[1], b[1], ...].
 *
 * @template T - The element type
 * @param a - The first array
 * @param b - The second array (must be same length as a)
 * @returns A new interleaved array, or empty array if lengths differ
 *
 * @example
 * ```typescript
 * arrayInterpolate([1, 3, 5], [2, 4, 6]); // [1, 2, 3, 4, 5, 6]
 * ```
 */
export const arrayInterpolate = <T>(a: T[], b: T[]): T[] => {
  const result: T[] = [];
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      result[2 * i] = a[i];
      result[2 * i + 1] = b[i];
    }
  }
  return result;
};
