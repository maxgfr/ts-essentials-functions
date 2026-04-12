import { average } from '../average';

describe('average', () => {
  describe('happy path', () => {
    it('should calculate average', () => {
      expect(average([1, 2, 3, 4])).toBe(2.5);
    });

    it('should handle single element', () => {
      expect(average([10])).toBe(10);
    });

    it('should handle negative numbers', () => {
      expect(average([-2, 2])).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle identical values', () => {
      expect(average([5, 5, 5])).toBe(5);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not an array', () => {
      expect(() => average('not' as unknown as number[])).toThrow(TypeError);
      expect(() => average('not' as unknown as number[])).toThrow(
        'Argument must be an array',
      );
    });

    it('should throw RangeError for empty array', () => {
      expect(() => average([])).toThrow(RangeError);
      expect(() => average([])).toThrow('Array must not be empty');
    });

    it('should throw TypeError when array contains non-numbers', () => {
      expect(() => average([1, 'a'] as unknown as number[])).toThrow(TypeError);
    });
  });
});
