import { intersection } from '../intersection';

describe('intersection', () => {
  describe('happy path', () => {
    it('should return common elements', () => {
      expect(intersection([1, 2, 3, 4], [3, 4, 5, 6])).toEqual([3, 4]);
    });

    it('should work with strings', () => {
      expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual([
        'b',
        'c',
      ]);
    });

    it('should return unique elements only', () => {
      expect(intersection([1, 1, 2, 2], [1, 2, 3])).toEqual([1, 2]);
    });
  });

  describe('edge cases', () => {
    it('should return empty array when no common elements', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([]);
    });

    it('should return empty array when both arrays are empty', () => {
      expect(intersection([], [])).toEqual([]);
    });

    it('should return empty array when first array is empty', () => {
      expect(intersection([], [1, 2, 3])).toEqual([]);
    });

    it('should return empty array when second array is empty', () => {
      expect(intersection([1, 2, 3], [])).toEqual([]);
    });

    it('should handle complete overlap', () => {
      expect(intersection([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original arrays', () => {
      const a1 = [1, 2, 3];
      const a2 = [2, 3, 4];
      const copyA1 = [...a1];
      const copyA2 = [...a2];
      intersection(a1, a2);
      expect(a1).toEqual(copyA1);
      expect(a2).toEqual(copyA2);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not an array', () => {
      expect(() => intersection('not' as unknown as unknown[], [1, 2])).toThrow(
        TypeError,
      );
      expect(() => intersection('not' as unknown as unknown[], [1, 2])).toThrow(
        'Both arguments must be arrays',
      );
    });

    it('should throw TypeError when second argument is not an array', () => {
      expect(() => intersection([1, 2], 'not' as unknown as unknown[])).toThrow(
        TypeError,
      );
    });
  });
});
