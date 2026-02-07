/**
 * Reorders an array based on a provided index mapping.
 *
 * @template T - The element type
 * @param a - The array to reorder
 * @param r - The index mapping array
 * @returns A new reordered array (does not mutate input)
 *
 * @example
 * ```typescript
 * const result = orderArraySame(['a', 'b', 'c'], [2, 0, 1]);
 * ```
 *
 * @remarks
 * - Does not mutate the input arrays
 * - Filters falsy values before reordering
 */
export function orderArraySame<T>(a: T[], r: number[]): T[] {
  const result = a.filter(Boolean);
  let j: number;
  for (let i = result.length - 1; i > 0; i--) {
    j = r[i];
    if (j === undefined || j === null) j = r[0];
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}
