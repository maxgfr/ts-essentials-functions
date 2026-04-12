/**
 * Returns a new Date set to the start of the day (00:00:00.000).
 *
 * @param date - The date
 * @returns A new Date at the start of the day
 *
 * @example
 * ```typescript
 * startOfDay(new Date('2025-01-15T14:30:00')); // 2025-01-15T00:00:00.000
 * ```
 *
 * @throws {TypeError} When argument is not a valid Date
 */
export function startOfDay(date: Date): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('First argument must be a valid Date');
  }

  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}
