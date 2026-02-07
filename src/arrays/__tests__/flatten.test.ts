import { flatten } from '../flatten';

describe('flatten', () => {
  describe('happy path', () => {
    it('should flatten one level deep by default', () => {
      expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, [3, [4]]]);
    });

    it('should flatten to specified depth', () => {
      expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
    });

    it('should flatten completely with Infinity depth', () => {
      expect(flatten([1, [2, [3, [4]]]], Infinity)).toEqual([1, 2, 3, 4]);
    });

    it('should handle already flat arrays', () => {
      expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should handle mixed nested arrays at depth 2', () => {
      expect(flatten([1, [2, 3], [4, [5]]], 2)).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('edge cases', () => {
    it('should return an empty array when given an empty array', () => {
      expect(flatten([])).toEqual([]);
    });

    it('should handle nested empty arrays', () => {
      expect(flatten([[], [], []])).toEqual([]);
    });

    it('should handle deeply nested empty arrays at depth 1', () => {
      expect(flatten([[[]]])).toEqual([[]]);
    });

    it('should handle deeply nested empty arrays at infinite depth', () => {
      expect(flatten([[[]]], Infinity)).toEqual([]);
    });

    it('should handle a single-element array', () => {
      expect(flatten([42])).toEqual([42]);
    });

    it('should handle a single-element nested array', () => {
      expect(flatten([[42]])).toEqual([42]);
    });

    it('should not flatten beyond the specified depth', () => {
      const input = [1, [2, [3, [4, [5]]]]];
      const result = flatten(input, 1);
      expect(result).toEqual([1, 2, [3, [4, [5]]]]);
    });

    it('should handle arrays with mixed types', () => {
      expect(flatten(['a', [1, [true]]], 2)).toEqual(['a', 1, true]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [1, [2, [3]]];
      const copy = JSON.parse(JSON.stringify(original));
      flatten(original, Infinity);
      expect(original).toEqual(copy);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not an array', () => {
      expect(() => flatten('not an array' as unknown as unknown[])).toThrow(
        TypeError,
      );
      expect(() => flatten('not an array' as unknown as unknown[])).toThrow(
        'First argument must be an array',
      );
    });

    it('should throw TypeError for null input', () => {
      expect(() => flatten(null as unknown as unknown[])).toThrow(TypeError);
    });

    it('should throw TypeError for undefined input', () => {
      expect(() => flatten(undefined as unknown as unknown[])).toThrow(
        TypeError,
      );
    });

    it('should throw TypeError for numeric input', () => {
      expect(() => flatten(42 as unknown as unknown[])).toThrow(TypeError);
    });
  });
});
