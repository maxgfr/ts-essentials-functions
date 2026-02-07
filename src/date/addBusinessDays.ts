/**
 * Adds business days to a date, skipping weekends.
 *
 * @param date - The start date
 * @param days - Number of business days to add (can be negative)
 * @returns A new Date with business days added (does not mutate input)
 *
 * @example
 * ```typescript
 * // Friday + 1 business day = Monday
 * addBusinessDays(new Date('2025-01-03'), 1); // 2025-01-06 (Monday)
 *
 * // Monday + 5 business days = next Monday
 * addBusinessDays(new Date('2025-01-06'), 5); // 2025-01-13
 * ```
 *
 * @throws {TypeError} When date is not a valid Date
 */
export function addBusinessDays(date: Date, days: number): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('First argument must be a valid Date');
  }

  const result = new Date(date);
  let remaining = Math.abs(days);
  const direction = days >= 0 ? 1 : -1;

  while (remaining > 0) {
    result.setDate(result.getDate() + direction);
    const day = result.getDay();
    if (day !== 0 && day !== 6) {
      remaining--;
    }
  }

  return result;
}
