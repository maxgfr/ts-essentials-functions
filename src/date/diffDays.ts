/**
 * Calculates the number of calendar days between two dates.
 *
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns The absolute number of days between the two dates
 *
 * @example
 * ```typescript
 * diffDays(new Date('2025-01-01'), new Date('2025-01-10')); // 9
 * diffDays(new Date('2025-01-10'), new Date('2025-01-01')); // 9
 * ```
 *
 * @throws {TypeError} When arguments are not valid Date objects
 */
export function diffDays(date1: Date, date2: Date): number {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new TypeError('Both arguments must be Date objects');
  }
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error('Invalid date provided');
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return Math.abs(Math.round((utc2 - utc1) / msPerDay));
}
