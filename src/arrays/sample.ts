/**
 * Returns a random element from an array.
 *
 * @template T - The element type
 * @param array - The array to sample from
 * @returns A random element
 *
 * @example
 * ```typescript
 * sample([1, 2, 3, 4, 5]); // Random element, e.g. 3
 * sample(['a', 'b', 'c']); // Random element, e.g. 'b'
 * ```
 *
 * @throws {TypeError} When argument is not an array
 * @throws {RangeError} When the array is empty
 *
 * @remarks
 * - Uses Math.random() and is not cryptographically secure
 */
export function sample<T>(array: T[]): T {
  if (!Array.isArray(array)) {
    throw new TypeError('Argument must be an array');
  }
  if (array.length === 0) {
    throw new RangeError('Array must not be empty');
  }

  return array[Math.floor(Math.random() * array.length)];
}
