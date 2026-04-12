/**
 * Returns a new Date set to the end of the day (23:59:59.999).
 *
 * @param date - The date
 * @returns A new Date at the end of the day
 *
 * @example
 * ```typescript
 * endOfDay(new Date('2025-01-15T14:30:00')); // 2025-01-15T23:59:59.999
 * ```
 *
 * @throws {TypeError} When argument is not a valid Date
 */
export function endOfDay(date: Date): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('First argument must be a valid Date');
  }

  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}
