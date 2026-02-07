/**
 * Transforms a date string between UTC and a target timezone.
 *
 * @param stringDate - The date string to transform
 * @param timeZone - The IANA timezone identifier (default: 'Europe/Paris')
 * @returns An object with toUtc and fromUtc Date representations
 *
 * @example
 * ```typescript
 * const result = timeZoneTransformer('2025-06-15T12:00:00', 'America/New_York');
 * result.toUtc; // UTC representation
 * result.fromUtc; // Adjusted for timezone
 * ```
 */
export const timeZoneTransformer = (
  stringDate: string,
  timeZone = 'Europe/Paris',
): { toUtc: Date; fromUtc: Date } => {
  const now = new Date();
  const serverDate = new Date(stringDate);
  const utcDate = new Date(
    Date.UTC(
      serverDate.getFullYear(),
      serverDate.getMonth(),
      serverDate.getDate(),
      serverDate.getHours(),
      serverDate.getMinutes(),
      serverDate.getSeconds(),
    ),
  );
  const invdate = new Date(
    serverDate.toLocaleString('en-US', {
      timeZone,
    }),
  );
  const diff = now.getTime() - invdate.getTime();
  const adjustedDate = new Date(now.getTime() - diff);
  return {
    toUtc: utcDate,
    fromUtc: adjustedDate,
  };
};
