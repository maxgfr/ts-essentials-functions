/**
 * Calculates the arithmetic average of an array of numbers.
 *
 * @param numbers - The array of numbers
 * @returns The average value
 *
 * @example
 * ```typescript
 * average([1, 2, 3, 4]); // 2.5
 * average([10]); // 10
 * ```
 *
 * @throws {TypeError} When argument is not an array of numbers
 * @throws {RangeError} When the array is empty
 */
export function average(numbers: number[]): number {
  if (!Array.isArray(numbers)) {
    throw new TypeError('Argument must be an array');
  }
  if (numbers.length === 0) {
    throw new RangeError('Array must not be empty');
  }

  for (const n of numbers) {
    if (typeof n !== 'number' || isNaN(n)) {
      throw new TypeError('All elements must be valid numbers');
    }
  }

  return numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
}
