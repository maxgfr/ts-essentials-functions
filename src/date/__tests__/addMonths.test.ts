import { addMonths } from '../addMonths';

describe('addMonths', () => {
  describe('happy path', () => {
    it('should add months to a date', () => {
      const date = new Date('2025-01-15');
      const result = addMonths(date, 3);

      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(3);
      expect(result.getDate()).toBe(15);
    });

    it('should add 1 month', () => {
      const date = new Date('2025-03-10');
      const result = addMonths(date, 1);

      expect(result.getMonth()).toBe(3);
      expect(result.getDate()).toBe(10);
    });

    it('should add 12 months (one year)', () => {
      const date = new Date('2025-06-15');
      const result = addMonths(date, 12);

      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });

    it('should handle crossing year boundaries', () => {
      const date = new Date('2025-11-15');
      const result = addMonths(date, 3);

      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(1);
    });
  });

  describe('negative months', () => {
    it('should subtract months from a date', () => {
      const date = new Date('2025-06-15');
      const result = addMonths(date, -3);

      expect(result.getMonth()).toBe(2);
      expect(result.getDate()).toBe(15);
    });

    it('should handle crossing year boundaries backwards', () => {
      const date = new Date('2025-02-15');
      const result = addMonths(date, -3);

      expect(result.getFullYear()).toBe(2024);
      expect(result.getMonth()).toBe(10);
    });
  });

  describe('edge cases', () => {
    it('should add 0 months and return the same date values', () => {
      const date = new Date('2025-06-15');
      const result = addMonths(date, 0);

      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(5);
      expect(result.getDate()).toBe(15);
    });

    it('should not mutate the original date', () => {
      const original = new Date('2025-01-15');
      const originalTime = original.getTime();
      addMonths(original, 5);

      expect(original.getTime()).toBe(originalTime);
    });

    it('should handle end-of-month overflow (Jan 31 + 1 month)', () => {
      const date = new Date(2025, 0, 31);
      const result = addMonths(date, 1);

      expect(result.getMonth()).toBe(2);
      expect(result.getDate()).toBe(3);
    });

    it('should handle February edge case with leap year', () => {
      const date = new Date(2024, 0, 31);
      const result = addMonths(date, 1);

      expect(result.getMonth()).toBe(2);
      expect(result.getDate()).toBe(2);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for non-Date input', () => {
      expect(() => addMonths('2025-01-01' as unknown as Date, 1)).toThrow(
        TypeError,
      );
      expect(() => addMonths('2025-01-01' as unknown as Date, 1)).toThrow(
        'First argument must be a valid Date',
      );
    });

    it('should throw TypeError for invalid Date', () => {
      expect(() => addMonths(new Date('invalid'), 1)).toThrow(TypeError);
    });

    it('should throw TypeError for null input', () => {
      expect(() => addMonths(null as unknown as Date, 1)).toThrow(TypeError);
    });

    it('should throw TypeError for undefined input', () => {
      expect(() => addMonths(undefined as unknown as Date, 1)).toThrow(
        TypeError,
      );
    });

    it('should throw TypeError for a number input', () => {
      expect(() => addMonths(12345 as unknown as Date, 1)).toThrow(TypeError);
    });
  });
});
