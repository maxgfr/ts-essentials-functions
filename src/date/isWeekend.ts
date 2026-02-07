/**
 * Checks if a given date falls on a weekend (Saturday or Sunday).
 *
 * @param date - The date to check
 * @returns True if the date is a Saturday or Sunday
 *
 * @example
 * ```typescript
 * isWeekend(new Date('2025-01-04')); // true (Saturday)
 * isWeekend(new Date('2025-01-06')); // false (Monday)
 * ```
 *
 * @throws {TypeError} When argument is not a valid Date
 */
export function isWeekend(date: Date): boolean {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('Argument must be a valid Date');
  }
  const day = date.getDay();
  return day === 0 || day === 6;
}
