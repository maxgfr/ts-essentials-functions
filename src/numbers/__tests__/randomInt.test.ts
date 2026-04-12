import { randomInt } from '../randomInt';

describe('randomInt', () => {
  describe('happy path', () => {
    it('should return an integer within the range', () => {
      for (let i = 0; i < 100; i++) {
        const result = randomInt(1, 10);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    it('should return min when min equals max', () => {
      expect(randomInt(5, 5)).toBe(5);
    });

    it('should handle negative ranges', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomInt(-10, -5);
        expect(result).toBeGreaterThanOrEqual(-10);
        expect(result).toBeLessThanOrEqual(-5);
      }
    });

    it('should handle zero in range', () => {
      for (let i = 0; i < 50; i++) {
        const result = randomInt(-1, 1);
        expect(result).toBeGreaterThanOrEqual(-1);
        expect(result).toBeLessThanOrEqual(1);
      }
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for non-integer min', () => {
      expect(() => randomInt(1.5, 10)).toThrow(TypeError);
      expect(() => randomInt(1.5, 10)).toThrow(
        'Both arguments must be integers',
      );
    });

    it('should throw TypeError for non-integer max', () => {
      expect(() => randomInt(1, 10.5)).toThrow(TypeError);
    });

    it('should throw RangeError when min is greater than max', () => {
      expect(() => randomInt(10, 1)).toThrow(RangeError);
      expect(() => randomInt(10, 1)).toThrow(
        'min must be less than or equal to max',
      );
    });
  });
});
