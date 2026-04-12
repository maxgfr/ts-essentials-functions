import { isLeapYear } from '../isLeapYear';

describe('isLeapYear', () => {
  describe('happy path', () => {
    it('should return true for common leap years', () => {
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2016)).toBe(true);
    });

    it('should return false for common non-leap years', () => {
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(2025)).toBe(false);
    });

    it('should return true for years divisible by 400', () => {
      expect(isLeapYear(2000)).toBe(true);
      expect(isLeapYear(1600)).toBe(true);
    });

    it('should return false for century years not divisible by 400', () => {
      expect(isLeapYear(1900)).toBe(false);
      expect(isLeapYear(1800)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle year 0', () => {
      expect(isLeapYear(0)).toBe(true);
    });

    it('should handle negative years', () => {
      expect(isLeapYear(-4)).toBe(true);
      expect(isLeapYear(-1)).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for non-integer', () => {
      expect(() => isLeapYear(2024.5)).toThrow(TypeError);
      expect(() => isLeapYear(2024.5)).toThrow('Argument must be an integer');
    });

    it('should throw TypeError for NaN', () => {
      expect(() => isLeapYear(NaN)).toThrow(TypeError);
    });
  });
});
