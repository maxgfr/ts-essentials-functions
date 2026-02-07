/**
 * Adds the specified number of months to a date.
 *
 * @param date - The base date
 * @param month - Number of months to add (can be negative to subtract)
 * @returns A new Date with the months added (does not mutate input)
 *
 * @example
 * ```typescript
 * addMonths(new Date('2025-01-15'), 3);
 * // Date representing 2025-04-15
 * ```
 *
 * @throws {TypeError} When date is not a valid Date object
 */
export const addMonths = (date: Date, month: number): Date => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('First argument must be a valid Date');
  }
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + month);
  return newDate;
};
