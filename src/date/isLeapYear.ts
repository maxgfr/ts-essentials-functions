/**
 * Checks if a year is a leap year.
 *
 * @param year - The year to check
 * @returns True if the year is a leap year
 *
 * @example
 * ```typescript
 * isLeapYear(2024); // true
 * isLeapYear(2023); // false
 * isLeapYear(2000); // true
 * isLeapYear(1900); // false
 * ```
 *
 * @throws {TypeError} When argument is not an integer
 */
export function isLeapYear(year: number): boolean {
  if (!Number.isInteger(year)) {
    throw new TypeError('Argument must be an integer');
  }

  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
