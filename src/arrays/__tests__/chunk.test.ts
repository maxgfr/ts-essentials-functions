import { chunk } from '../chunk';

describe('chunk', () => {
  describe('happy path', () => {
    it('should split an array into chunks of the specified size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should return a single chunk when size equals array length', () => {
      expect(chunk([1, 2, 3], 3)).toEqual([[1, 2, 3]]);
    });

    it('should return a single chunk when size exceeds array length', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });

    it('should create chunks of size 1', () => {
      expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
    });

    it('should work with string arrays', () => {
      expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([
        ['a', 'b'],
        ['c', 'd'],
      ]);
    });

    it('should work with mixed-type arrays', () => {
      expect(chunk([1, 'a', true, null], 2)).toEqual([
        [1, 'a'],
        [true, null],
      ]);
    });
  });

  describe('edge cases', () => {
    it('should return an empty array when given an empty array', () => {
      expect(chunk([], 3)).toEqual([]);
    });

    it('should handle a single-element array', () => {
      expect(chunk([42], 1)).toEqual([[42]]);
    });

    it('should handle a single-element array with a larger chunk size', () => {
      expect(chunk([42], 5)).toEqual([[42]]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [1, 2, 3, 4, 5];
      const copy = [...original];
      chunk(original, 2);
      expect(original).toEqual(copy);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not an array', () => {
      expect(() => chunk('not an array' as unknown as unknown[], 2)).toThrow(
        TypeError,
      );
      expect(() => chunk('not an array' as unknown as unknown[], 2)).toThrow(
        'First argument must be an array',
      );
    });

    it('should throw TypeError for null input', () => {
      expect(() => chunk(null as unknown as unknown[], 2)).toThrow(TypeError);
    });

    it('should throw TypeError for undefined input', () => {
      expect(() => chunk(undefined as unknown as unknown[], 2)).toThrow(
        TypeError,
      );
    });

    it('should throw RangeError when size is zero', () => {
      expect(() => chunk([1, 2, 3], 0)).toThrow(RangeError);
      expect(() => chunk([1, 2, 3], 0)).toThrow(
        'Size must be a positive integer',
      );
    });

    it('should throw RangeError when size is negative', () => {
      expect(() => chunk([1, 2, 3], -1)).toThrow(RangeError);
    });

    it('should throw RangeError when size is a float', () => {
      expect(() => chunk([1, 2, 3], 1.5)).toThrow(RangeError);
    });

    it('should throw RangeError when size is NaN', () => {
      expect(() => chunk([1, 2, 3], NaN)).toThrow(RangeError);
    });
  });
});
