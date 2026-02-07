/**
 * Formats a Date into a string with zero-padded values.
 *
 * @param date - The date to format
 * @param withHour - Whether to include time (default: false)
 * @returns Formatted date string in "YYYY-MM-DD" or "YYYY-MM-DD HH:mm:ss" format
 *
 * @example
 * ```typescript
 * formatDate(new Date('2025-01-05')); // "2025-01-05"
 * formatDate(new Date('2025-01-05T09:05:03'), true); // "2025-01-05 09:05:03"
 * ```
 *
 * @throws {TypeError} When date is not a valid Date object
 */
export const formatDate = (date: Date, withHour = false): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new TypeError('First argument must be a valid Date');
  }

  const pad = (n: number): string => n.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  return withHour
    ? `${year}-${month}-${day} ${hour}:${minute}:${second}`
    : `${year}-${month}-${day}`;
};
