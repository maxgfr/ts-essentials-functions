/**
 * Rounds a number to a specified number of decimal places, avoiding floating point issues.
 *
 * @param value - The number to round
 * @param decimals - The number of decimal places
 * @returns The rounded number
 *
 * @example
 * ```typescript
 * round(1.005, 2); // 1.01 (not 1.00 like Math.round)
 * round(1.2345, 2); // 1.23
 * round(1.5, 0); // 2
 * ```
 *
 * @throws {TypeError} When value is not a valid number
 * @throws {RangeError} When decimals is not a non-negative integer
 *
 * @remarks
 * - Uses exponential notation to avoid floating point precision errors
 */
export function round(value: number, decimals: number): number {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new TypeError('First argument must be a valid number');
  }
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new RangeError('decimals must be a non-negative integer');
  }

  return Number(
    Math.round(parseFloat(value + 'e' + decimals)) + 'e-' + decimals,
  );
}
