import { zip } from '../zip';

describe('zip', () => {
  describe('happy path', () => {
    it('should zip two arrays', () => {
      expect(zip([1, 2, 3], [4, 5, 6])).toEqual([
        [1, 4],
        [2, 5],
        [3, 6],
      ]);
    });

    it('should zip three arrays', () => {
      expect(zip([1, 2], [3, 4], [5, 6])).toEqual([
        [1, 3, 5],
        [2, 4, 6],
      ]);
    });

    it('should use shortest array length', () => {
      expect(zip([1, 2], [3, 4, 5])).toEqual([
        [1, 3],
        [2, 4],
      ]);
    });
  });

  describe('edge cases', () => {
    it('should return empty array when no arguments', () => {
      expect(zip()).toEqual([]);
    });

    it('should handle single array', () => {
      expect(zip([1, 2, 3])).toEqual([[1], [2], [3]]);
    });

    it('should return empty array when any array is empty', () => {
      expect(zip([1, 2], [])).toEqual([]);
    });

    it('should handle single element arrays', () => {
      expect(zip([1], [2])).toEqual([[1, 2]]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original arrays', () => {
      const a = [1, 2];
      const b = [3, 4];
      const copyA = [...a];
      const copyB = [...b];
      zip(a, b);
      expect(a).toEqual(copyA);
      expect(b).toEqual(copyB);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when any argument is not an array', () => {
      expect(() => zip([1], 'not' as unknown as unknown[])).toThrow(TypeError);
      expect(() => zip([1], 'not' as unknown as unknown[])).toThrow(
        'All arguments must be arrays',
      );
    });
  });
});
