/**
 * Counts the occurrences of each unique element in an array.
 *
 * @template T - The element type
 * @param arr - The input array
 * @returns A tuple of [uniqueElements, counts] where counts[i] is the count of uniqueElements[i]
 *
 * @example
 * ```typescript
 * getRepeatedOccurrenceArray([1, 2, 2, 3, 3, 3]);
 * // [[1, 2, 3], [1, 2, 3]]
 * ```
 *
 * @remarks
 * - Does not mutate the input array
 * - Sorts a copy of the array internally for grouping
 */
export function getRepeatedOccurrenceArray<T>(arr: T[]): [T[], number[]] {
  const sorted = [...arr].sort();
  const uniqueElements: T[] = [];
  const counts: number[] = [];
  let prev: T | undefined;

  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 || sorted[i] !== prev) {
      uniqueElements.push(sorted[i]);
      counts.push(1);
    } else {
      counts[counts.length - 1]++;
    }
    prev = sorted[i];
  }

  return [uniqueElements, counts];
}
