/**
 * Counts the number of weekend days (Saturday and Sunday) between two dates, inclusive.
 *
 * @param startDate - The start date of the range
 * @param endDate - The end date of the range
 * @returns The number of weekend days in the range
 *
 * @example
 * ```typescript
 * const count = countWeekendDays(new Date('2025-01-01'), new Date('2025-01-07'));
 * // Returns 2 (Saturday Jan 4, Sunday Jan 5)
 * ```
 *
 * @throws {TypeError} When arguments are not Date objects
 * @throws {Error} When dates are invalid
 */
export const countWeekendDays = (startDate: Date, endDate: Date): number => {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    throw new TypeError('Both arguments must be Date objects');
  }
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Invalid date provided');
  }

  const localStart = new Date(startDate);
  const localEnd = new Date(endDate);

  if (localStart > localEnd) {
    return 0;
  }

  let totalWeekends = 0;
  const current = new Date(localStart);

  while (current <= localEnd) {
    if (current.getDay() === 0 || current.getDay() === 6) {
      totalWeekends++;
    }
    current.setDate(current.getDate() + 1);
  }

  return totalWeekends;
};
