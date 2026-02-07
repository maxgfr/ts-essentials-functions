/**
 * Removes all falsy values from an array.
 *
 * @template T - The element type
 * @param actual - The input array
 * @returns A new array with only truthy values
 *
 * @example
 * ```typescript
 * cleanArray([0, 1, '', 'hello', null, undefined, false, true]);
 * // [1, 'hello', true]
 * ```
 *
 * @remarks
 * Does not mutate the input array.
 */
export function cleanArray<T>(actual: T[]): NonNullable<T>[] {
  return actual.filter(Boolean) as NonNullable<T>[];
}
