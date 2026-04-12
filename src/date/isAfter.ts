/**
 * Checks if the first date is after the second date.
 *
 * @param date1 - The date to check
 * @param date2 - The date to compare against
 * @returns True if date1 is after date2
 *
 * @example
 * ```typescript
 * isAfter(new Date('2025-12-31'), new Date('2025-01-01')); // true
 * isAfter(new Date('2025-01-01'), new Date('2025-12-31')); // false
 * ```
 *
 * @throws {TypeError} When either argument is not a valid Date
 */
export function isAfter(date1: Date, date2: Date): boolean {
  if (!(date1 instanceof Date) || isNaN(date1.getTime())) {
    throw new TypeError('First argument must be a valid Date');
  }
  if (!(date2 instanceof Date) || isNaN(date2.getTime())) {
    throw new TypeError('Second argument must be a valid Date');
  }

  return date1.getTime() > date2.getTime();
}
