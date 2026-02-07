import { isWeekend } from '../isWeekend';

describe('isWeekend', () => {
  describe('happy path', () => {
    it('should return true for a Saturday', () => {
      const saturday = new Date('2025-01-04');
      expect(isWeekend(saturday)).toBe(true);
    });

    it('should return true for a Sunday', () => {
      const sunday = new Date('2025-01-05');
      expect(isWeekend(sunday)).toBe(true);
    });

    it('should return false for a Monday', () => {
      const monday = new Date('2025-01-06');
      expect(isWeekend(monday)).toBe(false);
    });

    it('should return false for a Tuesday', () => {
      const tuesday = new Date('2025-01-07');
      expect(isWeekend(tuesday)).toBe(false);
    });

    it('should return false for a Wednesday', () => {
      const wednesday = new Date('2025-01-08');
      expect(isWeekend(wednesday)).toBe(false);
    });

    it('should return false for a Thursday', () => {
      const thursday = new Date('2025-01-09');
      expect(isWeekend(thursday)).toBe(false);
    });

    it('should return false for a Friday', () => {
      const friday = new Date('2025-01-10');
      expect(isWeekend(friday)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle dates at the boundary of Saturday (midnight)', () => {
      const saturdayMidnight = new Date(2025, 0, 4, 0, 0, 0);
      expect(isWeekend(saturdayMidnight)).toBe(true);
    });

    it('should handle dates at the end of Sunday (23:59:59)', () => {
      const sundayEnd = new Date(2025, 0, 5, 23, 59, 59);
      expect(isWeekend(sundayEnd)).toBe(true);
    });

    it('should handle dates across different months', () => {
      expect(isWeekend(new Date('2025-02-01'))).toBe(true);
      expect(isWeekend(new Date('2025-03-01'))).toBe(true);
    });

    it('should handle new year weekends', () => {
      const jan1_2022 = new Date('2022-01-01');
      expect(isWeekend(jan1_2022)).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for non-Date input', () => {
      expect(() => isWeekend('2025-01-04' as unknown as Date)).toThrow(
        TypeError,
      );
      expect(() => isWeekend('2025-01-04' as unknown as Date)).toThrow(
        'Argument must be a valid Date',
      );
    });

    it('should throw TypeError for invalid Date', () => {
      expect(() => isWeekend(new Date('invalid'))).toThrow(TypeError);
    });

    it('should throw TypeError for null', () => {
      expect(() => isWeekend(null as unknown as Date)).toThrow(TypeError);
    });

    it('should throw TypeError for undefined', () => {
      expect(() => isWeekend(undefined as unknown as Date)).toThrow(TypeError);
    });

    it('should throw TypeError for a number', () => {
      expect(() => isWeekend(12345 as unknown as Date)).toThrow(TypeError);
    });
  });
});
