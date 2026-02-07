import { formatDate } from '../formatDate';

describe('formatDate', () => {
  describe('happy path - date only', () => {
    it('should format a date as YYYY-MM-DD', () => {
      const date = new Date(2025, 0, 15);

      expect(formatDate(date)).toBe('2025-01-15');
    });

    it('should zero-pad single-digit month and day', () => {
      const date = new Date(2025, 0, 5);

      expect(formatDate(date)).toBe('2025-01-05');
    });

    it('should handle December 31', () => {
      const date = new Date(2025, 11, 31);

      expect(formatDate(date)).toBe('2025-12-31');
    });

    it('should default withHour to false', () => {
      const date = new Date(2025, 5, 15, 14, 30, 45);

      expect(formatDate(date)).toBe('2025-06-15');
    });
  });

  describe('happy path - with time', () => {
    it('should format a date with time as YYYY-MM-DD HH:mm:ss', () => {
      const date = new Date(2025, 0, 5, 9, 5, 3);

      expect(formatDate(date, true)).toBe('2025-01-05 09:05:03');
    });

    it('should zero-pad hours, minutes, and seconds', () => {
      const date = new Date(2025, 0, 1, 1, 2, 3);

      expect(formatDate(date, true)).toBe('2025-01-01 01:02:03');
    });

    it('should handle midnight', () => {
      const date = new Date(2025, 5, 15, 0, 0, 0);

      expect(formatDate(date, true)).toBe('2025-06-15 00:00:00');
    });

    it('should handle end of day', () => {
      const date = new Date(2025, 5, 15, 23, 59, 59);

      expect(formatDate(date, true)).toBe('2025-06-15 23:59:59');
    });

    it('should handle double-digit hours', () => {
      const date = new Date(2025, 5, 15, 14, 30, 45);

      expect(formatDate(date, true)).toBe('2025-06-15 14:30:45');
    });
  });

  describe('edge cases', () => {
    it('should handle February 29 in a leap year', () => {
      const date = new Date(2024, 1, 29);

      expect(formatDate(date)).toBe('2024-02-29');
    });

    it('should explicitly pass false for withHour', () => {
      const date = new Date(2025, 5, 15, 14, 30, 45);

      expect(formatDate(date, false)).toBe('2025-06-15');
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for non-Date input', () => {
      expect(() => formatDate('2025-01-01' as unknown as Date)).toThrow(
        TypeError,
      );
      expect(() => formatDate('2025-01-01' as unknown as Date)).toThrow(
        'First argument must be a valid Date',
      );
    });

    it('should throw TypeError for invalid Date', () => {
      expect(() => formatDate(new Date('invalid'))).toThrow(TypeError);
    });

    it('should throw TypeError for null input', () => {
      expect(() => formatDate(null as unknown as Date)).toThrow(TypeError);
    });

    it('should throw TypeError for undefined input', () => {
      expect(() => formatDate(undefined as unknown as Date)).toThrow(TypeError);
    });

    it('should throw TypeError for a number input', () => {
      expect(() => formatDate(12345 as unknown as Date)).toThrow(TypeError);
    });
  });
});
