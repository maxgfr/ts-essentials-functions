import { round } from '../round';

describe('round', () => {
  describe('happy path', () => {
    it('should round to 2 decimal places', () => {
      expect(round(1.2345, 2)).toBe(1.23);
    });

    it('should round to 0 decimal places', () => {
      expect(round(1.5, 0)).toBe(2);
    });

    it('should handle the 1.005 floating point case', () => {
      expect(round(1.005, 2)).toBe(1.01);
    });

    it('should handle 0.1 + 0.2 floating point case', () => {
      expect(round(0.1 + 0.2, 1)).toBe(0.3);
    });
  });

  describe('edge cases', () => {
    it('should handle zero', () => {
      expect(round(0, 2)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(round(-1.2345, 2)).toBe(-1.23);
    });

    it('should handle integers', () => {
      expect(round(5, 2)).toBe(5);
    });

    it('should handle large decimal places', () => {
      expect(round(1.123456789, 5)).toBe(1.12346);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for NaN value', () => {
      expect(() => round(NaN, 2)).toThrow(TypeError);
      expect(() => round(NaN, 2)).toThrow(
        'First argument must be a valid number',
      );
    });

    it('should throw TypeError for non-number value', () => {
      expect(() => round('5' as unknown as number, 2)).toThrow(TypeError);
    });

    it('should throw RangeError for negative decimals', () => {
      expect(() => round(1.5, -1)).toThrow(RangeError);
      expect(() => round(1.5, -1)).toThrow(
        'decimals must be a non-negative integer',
      );
    });

    it('should throw RangeError for non-integer decimals', () => {
      expect(() => round(1.5, 1.5)).toThrow(RangeError);
    });
  });
});
