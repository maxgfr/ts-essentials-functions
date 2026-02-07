import { getDifferenceArray } from '../getDifference';

describe('getDifferenceArray', () => {
  describe('happy path', () => {
    it('should return the symmetric difference of two number arrays', () => {
      const result = getDifferenceArray([1, 2, 3], [2, 3, 4]);
      expect(result).toEqual([1, 4]);
    });

    it('should return the symmetric difference of two string arrays', () => {
      const result = getDifferenceArray(['a', 'b'], ['b', 'c']);
      expect(result).toEqual(['a', 'c']);
    });

    it('should return all elements when arrays have no overlap', () => {
      const result = getDifferenceArray([1, 2], [3, 4]);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should return an empty array when both arrays are identical', () => {
      const result = getDifferenceArray([1, 2, 3], [1, 2, 3]);
      expect(result).toEqual([]);
    });
  });

  describe('edge cases', () => {
    it('should return an empty array when both arrays are empty', () => {
      expect(getDifferenceArray([], [])).toEqual([]);
    });

    it('should return the first array when the second is empty', () => {
      expect(getDifferenceArray([1, 2, 3], [])).toEqual([1, 2, 3]);
    });

    it('should return the second array when the first is empty', () => {
      expect(getDifferenceArray([], [1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should handle single-element arrays with no overlap', () => {
      expect(getDifferenceArray([1], [2])).toEqual([1, 2]);
    });

    it('should handle single-element arrays with overlap', () => {
      expect(getDifferenceArray([1], [1])).toEqual([]);
    });

    it('should deduplicate via Set (duplicates in input are collapsed)', () => {
      const result = getDifferenceArray([1, 1, 2], [2, 3, 3]);
      expect(result).toEqual([1, 3]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original arrays', () => {
      const a1 = [1, 2, 3];
      const a2 = [2, 3, 4];
      const copy1 = [...a1];
      const copy2 = [...a2];
      getDifferenceArray(a1, a2);
      expect(a1).toEqual(copy1);
      expect(a2).toEqual(copy2);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not an array', () => {
      expect(() =>
        getDifferenceArray('not array' as unknown as unknown[], [1, 2]),
      ).toThrow(TypeError);
      expect(() =>
        getDifferenceArray('not array' as unknown as unknown[], [1, 2]),
      ).toThrow('Both arguments must be arrays');
    });

    it('should throw TypeError when second argument is not an array', () => {
      expect(() =>
        getDifferenceArray([1, 2], 'not array' as unknown as unknown[]),
      ).toThrow(TypeError);
    });

    it('should throw TypeError when both arguments are not arrays', () => {
      expect(() =>
        getDifferenceArray(
          null as unknown as unknown[],
          undefined as unknown as unknown[],
        ),
      ).toThrow(TypeError);
    });
  });
});
