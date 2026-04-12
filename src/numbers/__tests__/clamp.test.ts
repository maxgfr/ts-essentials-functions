import { clamp } from '../clamp';

describe('clamp', () => {
  describe('happy path', () => {
    it('should clamp a value above max to max', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should clamp a value below min to min', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    it('should return value when within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('should return min when value equals min', () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });

    it('should return max when value equals max', () => {
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });

  describe('edge cases', () => {
    it('should handle min equal to max', () => {
      expect(clamp(5, 3, 3)).toBe(3);
    });

    it('should handle negative ranges', () => {
      expect(clamp(0, -10, -5)).toBe(-5);
    });

    it('should handle decimal values', () => {
      expect(clamp(1.5, 0, 1)).toBe(1);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for NaN value', () => {
      expect(() => clamp(NaN, 0, 10)).toThrow(TypeError);
      expect(() => clamp(NaN, 0, 10)).toThrow(
        'All arguments must be valid numbers',
      );
    });

    it('should throw TypeError for non-number arguments', () => {
      expect(() => clamp('5' as unknown as number, 0, 10)).toThrow(TypeError);
    });

    it('should throw RangeError when min is greater than max', () => {
      expect(() => clamp(5, 10, 0)).toThrow(RangeError);
      expect(() => clamp(5, 10, 0)).toThrow(
        'min must be less than or equal to max',
      );
    });
  });
});
