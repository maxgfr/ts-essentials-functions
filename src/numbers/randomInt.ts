/**
 * Generates a random integer within an inclusive range.
 *
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random integer between min and max
 *
 * @example
 * ```typescript
 * randomInt(1, 10); // Random integer from 1 to 10
 * randomInt(0, 1); // 0 or 1
 * randomInt(5, 5); // 5
 * ```
 *
 * @throws {TypeError} When arguments are not integers
 * @throws {RangeError} When min is greater than max
 *
 * @remarks
 * - Uses Math.random() and is not cryptographically secure
 */
export function randomInt(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new TypeError('Both arguments must be integers');
  }
  if (min > max) {
    throw new RangeError('min must be less than or equal to max');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
