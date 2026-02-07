import { countWeekendDays } from '../countWeekendDays';

describe('countWeekendDays', () => {
  describe('happy path', () => {
    it('should count weekend days in a one-week range', () => {
      const start = new Date('2025-01-06');
      const end = new Date('2025-01-12');
      const result = countWeekendDays(start, end);

      expect(result).toBe(2);
    });

    it('should count weekend days in a two-week range', () => {
      const start = new Date('2025-01-06');
      const end = new Date('2025-01-19');
      const result = countWeekendDays(start, end);

      expect(result).toBe(4);
    });

    it('should count 1 when range includes only a Saturday', () => {
      const start = new Date('2025-01-04');
      const end = new Date('2025-01-04');
      const result = countWeekendDays(start, end);

      expect(result).toBe(1);
    });

    it('should count 1 when range includes only a Sunday', () => {
      const start = new Date('2025-01-05');
      const end = new Date('2025-01-05');
      const result = countWeekendDays(start, end);

      expect(result).toBe(1);
    });

    it('should count 2 when range is Saturday to Sunday', () => {
      const start = new Date('2025-01-04');
      const end = new Date('2025-01-05');
      const result = countWeekendDays(start, end);

      expect(result).toBe(2);
    });

    it('should count 0 when range is only weekdays', () => {
      const start = new Date('2025-01-06');
      const end = new Date('2025-01-10');
      const result = countWeekendDays(start, end);

      expect(result).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should return 0 when start date is after end date', () => {
      const start = new Date('2025-01-12');
      const end = new Date('2025-01-06');
      const result = countWeekendDays(start, end);

      expect(result).toBe(0);
    });

    it('should return 0 when both dates are the same weekday', () => {
      const date = new Date('2025-01-08');
      const result = countWeekendDays(date, date);

      expect(result).toBe(0);
    });

    it('should handle ranges spanning month boundaries', () => {
      const start = new Date('2025-01-27');
      const end = new Date('2025-02-09');
      const result = countWeekendDays(start, end);

      expect(result).toBe(4);
    });

    it('should handle ranges spanning year boundaries', () => {
      const start = new Date('2024-12-30');
      const end = new Date('2025-01-05');
      const result = countWeekendDays(start, end);

      expect(result).toBe(2);
    });

    it('should not mutate the input dates', () => {
      const start = new Date('2025-01-06');
      const end = new Date('2025-01-12');
      const startTime = start.getTime();
      const endTime = end.getTime();

      countWeekendDays(start, end);

      expect(start.getTime()).toBe(startTime);
      expect(end.getTime()).toBe(endTime);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for non-Date first argument', () => {
      expect(() =>
        countWeekendDays('2025-01-01' as unknown as Date, new Date()),
      ).toThrow(TypeError);
      expect(() =>
        countWeekendDays('2025-01-01' as unknown as Date, new Date()),
      ).toThrow('Both arguments must be Date objects');
    });

    it('should throw TypeError for non-Date second argument', () => {
      expect(() =>
        countWeekendDays(new Date(), '2025-01-01' as unknown as Date),
      ).toThrow(TypeError);
    });

    it('should throw Error for invalid first Date', () => {
      expect(() => countWeekendDays(new Date('invalid'), new Date())).toThrow(
        'Invalid date provided',
      );
    });

    it('should throw Error for invalid second Date', () => {
      expect(() => countWeekendDays(new Date(), new Date('invalid'))).toThrow(
        'Invalid date provided',
      );
    });

    it('should throw TypeError for null arguments', () => {
      expect(() =>
        countWeekendDays(null as unknown as Date, new Date()),
      ).toThrow(TypeError);
    });
  });
});
