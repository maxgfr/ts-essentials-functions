/**
 * Generates an array of numbers from start to end (exclusive).
 *
 * @param start - The start of the range
 * @param end - The end of the range (exclusive)
 * @param step - The step between values (default: 1 or -1 based on direction)
 * @returns An array of numbers
 *
 * @example
 * ```typescript
 * range(0, 5); // [0, 1, 2, 3, 4]
 * range(0, 10, 2); // [0, 2, 4, 6, 8]
 * range(5, 0, -1); // [5, 4, 3, 2, 1]
 * ```
 *
 * @throws {TypeError} When start or end is not a valid number
 * @throws {RangeError} When step is zero or has wrong sign for the direction
 */
export function range(start: number, end: number, step?: number): number[] {
  if (typeof start !== 'number' || isNaN(start)) {
    throw new TypeError('start must be a valid number');
  }
  if (typeof end !== 'number' || isNaN(end)) {
    throw new TypeError('end must be a valid number');
  }

  if (start === end) {
    return [];
  }

  const direction = start < end ? 1 : -1;
  const s = step ?? direction;

  if (s === 0) {
    throw new RangeError('step must not be zero');
  }
  if ((direction > 0 && s < 0) || (direction < 0 && s > 0)) {
    throw new RangeError(
      'step sign must match the direction from start to end',
    );
  }

  const result: number[] = [];

  if (s > 0) {
    for (let i = start; i < end; i += s) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += s) {
      result.push(i);
    }
  }

  return result;
}
