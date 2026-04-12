import { unique } from '../unique';

describe('unique', () => {
  describe('happy path', () => {
    it('should remove duplicate numbers', () => {
      expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    });

    it('should remove duplicate strings', () => {
      expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });

    it('should keep order of first occurrence', () => {
      expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    });
  });

  describe('edge cases', () => {
    it('should return empty array for empty input', () => {
      expect(unique([])).toEqual([]);
    });

    it('should return same array when all elements are unique', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should handle single element', () => {
      expect(unique([42])).toEqual([42]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [1, 2, 2, 3];
      const copy = [...original];
      unique(original);
      expect(original).toEqual(copy);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not an array', () => {
      expect(() => unique('not an array' as unknown as unknown[])).toThrow(
        TypeError,
      );
      expect(() => unique('not an array' as unknown as unknown[])).toThrow(
        'First argument must be an array',
      );
    });
  });
});
