/**
 * Adds a number of days to a date.
 *
 * @param date - The start date
 * @param days - Number of days to add (can be negative)
 * @returns A new Date with days added (does not mutate input)
 *
 * @example
 * ```typescript
 * addDays(new Date('2025-01-15'), 3); // 2025-01-18
 * addDays(new Date('2025-01-15'), -5); // 2025-01-10
 * ```
 *
 * @throws {TypeError} When first argument is not a valid Date
 */
export function addDays(date: Date, days: number): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('First argument must be a valid Date');
  }

  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
