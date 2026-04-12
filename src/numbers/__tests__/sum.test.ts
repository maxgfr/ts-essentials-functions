import { sum } from '../sum';

describe('sum', () => {
  describe('happy path', () => {
    it('should sum an array of numbers', () => {
      expect(sum([1, 2, 3, 4])).toBe(10);
    });

    it('should handle negative numbers', () => {
      expect(sum([-1, -2, 3])).toBe(0);
    });

    it('should handle decimals', () => {
      expect(sum([0.1, 0.2, 0.3])).toBeCloseTo(0.6);
    });

    it('should handle single element', () => {
      expect(sum([42])).toBe(42);
    });
  });

  describe('edge cases', () => {
    it('should return 0 for empty array', () => {
      expect(sum([])).toBe(0);
    });

    it('should handle zeros', () => {
      expect(sum([0, 0, 0])).toBe(0);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not an array', () => {
      expect(() => sum('not' as unknown as number[])).toThrow(TypeError);
      expect(() => sum('not' as unknown as number[])).toThrow(
        'Argument must be an array',
      );
    });

    it('should throw TypeError when array contains non-numbers', () => {
      expect(() => sum([1, 'a'] as unknown as number[])).toThrow(TypeError);
      expect(() => sum([1, 'a'] as unknown as number[])).toThrow(
        'All elements must be valid numbers',
      );
    });

    it('should throw TypeError when array contains NaN', () => {
      expect(() => sum([1, NaN])).toThrow(TypeError);
    });
  });
});
