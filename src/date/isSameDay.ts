/**
 * Checks if two dates fall on the same calendar day.
 *
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns True if both dates are on the same day
 *
 * @example
 * ```typescript
 * isSameDay(new Date('2025-01-15 10:00'), new Date('2025-01-15 22:00')); // true
 * isSameDay(new Date('2025-01-15'), new Date('2025-01-16')); // false
 * ```
 *
 * @throws {TypeError} When either argument is not a valid Date
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  if (!(date1 instanceof Date) || isNaN(date1.getTime())) {
    throw new TypeError('First argument must be a valid Date');
  }
  if (!(date2 instanceof Date) || isNaN(date2.getTime())) {
    throw new TypeError('Second argument must be a valid Date');
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
