import { addDays } from '../addDays';

describe('addDays', () => {
  describe('happy path', () => {
    it('should add days to a date', () => {
      const result = addDays(new Date('2025-01-15'), 3);
      expect(result.getDate()).toBe(18);
    });

    it('should subtract days with negative value', () => {
      const result = addDays(new Date('2025-01-15'), -5);
      expect(result.getDate()).toBe(10);
    });

    it('should handle month boundaries', () => {
      const result = addDays(new Date('2025-01-30'), 3);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(2);
    });

    it('should handle year boundaries', () => {
      const result = addDays(new Date('2025-12-30'), 5);
      expect(result.getFullYear()).toBe(2026);
      expect(result.getMonth()).toBe(0); // January
    });
  });

  describe('edge cases', () => {
    it('should return same date when adding 0 days', () => {
      const date = new Date('2025-06-15');
      const result = addDays(date, 0);
      expect(result.getDate()).toBe(15);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original date', () => {
      const original = new Date('2025-01-15');
      const originalTime = original.getTime();
      addDays(original, 10);
      expect(original.getTime()).toBe(originalTime);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for invalid date', () => {
      expect(() => addDays('not' as unknown as Date, 1)).toThrow(TypeError);
      expect(() => addDays('not' as unknown as Date, 1)).toThrow(
        'First argument must be a valid Date',
      );
    });

    it('should throw TypeError for invalid Date object', () => {
      expect(() => addDays(new Date('invalid'), 1)).toThrow(TypeError);
    });
  });
});
