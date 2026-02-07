import { arrayInterpolate } from '../interpolate';

describe('arrayInterpolate', () => {
  describe('happy path', () => {
    it('should interleave two number arrays', () => {
      expect(arrayInterpolate([1, 3, 5], [2, 4, 6])).toEqual([
        1, 2, 3, 4, 5, 6,
      ]);
    });

    it('should interleave two string arrays', () => {
      expect(arrayInterpolate(['a', 'c'], ['b', 'd'])).toEqual([
        'a',
        'b',
        'c',
        'd',
      ]);
    });

    it('should handle single-element arrays', () => {
      expect(arrayInterpolate([1], [2])).toEqual([1, 2]);
    });
  });

  describe('edge cases', () => {
    it('should return an empty array when both inputs are empty', () => {
      expect(arrayInterpolate([], [])).toEqual([]);
    });

    it('should return an empty array when arrays have different lengths', () => {
      expect(arrayInterpolate([1, 2, 3], [4, 5])).toEqual([]);
    });

    it('should return an empty array when first is longer than second', () => {
      expect(arrayInterpolate([1], [2, 3])).toEqual([]);
    });

    it('should handle arrays with mixed types', () => {
      const a = [1, 'a'] as (string | number)[];
      const b = [2, 'b'] as (string | number)[];
      expect(arrayInterpolate(a, b)).toEqual([1, 2, 'a', 'b']);
    });

    it('should handle arrays with null and undefined values', () => {
      expect(arrayInterpolate([null, 1], [undefined, 2])).toEqual([
        null,
        undefined,
        1,
        2,
      ]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original arrays', () => {
      const a = [1, 3, 5];
      const b = [2, 4, 6];
      const copyA = [...a];
      const copyB = [...b];
      arrayInterpolate(a, b);
      expect(a).toEqual(copyA);
      expect(b).toEqual(copyB);
    });

    it('should return a new array reference', () => {
      const a = [1];
      const b = [2];
      const result = arrayInterpolate(a, b);
      expect(result).not.toBe(a);
      expect(result).not.toBe(b);
    });
  });
});
