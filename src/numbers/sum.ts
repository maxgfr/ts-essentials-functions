/**
 * Calculates the sum of an array of numbers.
 *
 * @param numbers - The array of numbers to sum
 * @returns The sum of all numbers
 *
 * @example
 * ```typescript
 * sum([1, 2, 3, 4]); // 10
 * sum([]); // 0
 * ```
 *
 * @throws {TypeError} When argument is not an array of numbers
 */
export function sum(numbers: number[]): number {
  if (!Array.isArray(numbers)) {
    throw new TypeError('Argument must be an array');
  }

  for (const n of numbers) {
    if (typeof n !== 'number' || isNaN(n)) {
      throw new TypeError('All elements must be valid numbers');
    }
  }

  return numbers.reduce((acc, n) => acc + n, 0);
}
