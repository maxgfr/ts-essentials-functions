import { diffDays } from '../diffDays';

describe('diffDays', () => {
  describe('happy path', () => {
    it('should calculate difference in days between two dates', () => {
      const date1 = new Date('2025-01-01');
      const date2 = new Date('2025-01-10');

      expect(diffDays(date1, date2)).toBe(9);
    });

    it('should return the absolute difference regardless of order', () => {
      const date1 = new Date('2025-01-01');
      const date2 = new Date('2025-01-10');

      expect(diffDays(date1, date2)).toBe(diffDays(date2, date1));
    });

    it('should calculate difference across months', () => {
      const date1 = new Date('2025-01-15');
      const date2 = new Date('2025-03-15');

      expect(diffDays(date1, date2)).toBe(59);
    });

    it('should calculate difference across years', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2025-01-01');

      expect(diffDays(date1, date2)).toBe(366);
    });

    it('should handle large date differences', () => {
      const date1 = new Date('2020-01-01');
      const date2 = new Date('2025-01-01');

      expect(diffDays(date1, date2)).toBe(1827);
    });
  });

  describe('edge cases', () => {
    it('should return 0 for the same date', () => {
      const date = new Date('2025-06-15');

      expect(diffDays(date, date)).toBe(0);
    });

    it('should return 0 for two dates on the same day with different times', () => {
      const date1 = new Date('2025-06-15T00:00:00');
      const date2 = new Date('2025-06-15T23:59:59');

      expect(diffDays(date1, date2)).toBe(0);
    });

    it('should return 1 for consecutive days', () => {
      const date1 = new Date('2025-01-01');
      const date2 = new Date('2025-01-02');

      expect(diffDays(date1, date2)).toBe(1);
    });

    it('should handle leap year date differences', () => {
      const date1 = new Date('2024-02-28');
      const date2 = new Date('2024-03-01');

      expect(diffDays(date1, date2)).toBe(2);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for non-Date first argument', () => {
      expect(() =>
        diffDays('2025-01-01' as unknown as Date, new Date()),
      ).toThrow(TypeError);
      expect(() =>
        diffDays('2025-01-01' as unknown as Date, new Date()),
      ).toThrow('Both arguments must be Date objects');
    });

    it('should throw TypeError for non-Date second argument', () => {
      expect(() =>
        diffDays(new Date(), '2025-01-01' as unknown as Date),
      ).toThrow(TypeError);
    });

    it('should throw Error for invalid first Date', () => {
      expect(() => diffDays(new Date('invalid'), new Date())).toThrow(
        'Invalid date provided',
      );
    });

    it('should throw Error for invalid second Date', () => {
      expect(() => diffDays(new Date(), new Date('invalid'))).toThrow(
        'Invalid date provided',
      );
    });

    it('should throw TypeError for null arguments', () => {
      expect(() => diffDays(null as unknown as Date, new Date())).toThrow(
        TypeError,
      );
    });

    it('should throw TypeError for undefined arguments', () => {
      expect(() => diffDays(undefined as unknown as Date, new Date())).toThrow(
        TypeError,
      );
    });
  });
});
