/**
 * Constrains a number between a minimum and maximum bound.
 *
 * @param value - The number to clamp
 * @param min - The minimum bound
 * @param max - The maximum bound
 * @returns The clamped number
 *
 * @example
 * ```typescript
 * clamp(15, 0, 10); // 10
 * clamp(-5, 0, 10); // 0
 * clamp(5, 0, 10); // 5
 * ```
 *
 * @throws {TypeError} When any argument is not a valid number
 * @throws {RangeError} When min is greater than max
 */
export function clamp(value: number, min: number, max: number): number {
  if (
    typeof value !== 'number' ||
    typeof min !== 'number' ||
    typeof max !== 'number' ||
    isNaN(value) ||
    isNaN(min) ||
    isNaN(max)
  ) {
    throw new TypeError('All arguments must be valid numbers');
  }
  if (min > max) {
    throw new RangeError('min must be less than or equal to max');
  }

  return Math.min(Math.max(value, min), max);
}
