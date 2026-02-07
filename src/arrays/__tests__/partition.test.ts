import { partition } from '../partition';

describe('partition', () => {
  describe('happy path', () => {
    it('should partition numbers into evens and odds', () => {
      const [evens, odds] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
      expect(evens).toEqual([2, 4]);
      expect(odds).toEqual([1, 3, 5]);
    });

    it('should partition strings by length', () => {
      const [short, long] = partition(
        ['hi', 'hello', 'yo', 'world'],
        (s) => s.length <= 2,
      );
      expect(short).toEqual(['hi', 'yo']);
      expect(long).toEqual(['hello', 'world']);
    });

    it('should partition objects by a property', () => {
      const users = [
        { name: 'Alice', active: true },
        { name: 'Bob', active: false },
        { name: 'Charlie', active: true },
      ];
      const [active, inactive] = partition(users, (u) => u.active);
      expect(active).toEqual([
        { name: 'Alice', active: true },
        { name: 'Charlie', active: true },
      ]);
      expect(inactive).toEqual([{ name: 'Bob', active: false }]);
    });
  });

  describe('edge cases', () => {
    it('should return two empty arrays for an empty input', () => {
      const [matching, nonMatching] = partition([], () => true);
      expect(matching).toEqual([]);
      expect(nonMatching).toEqual([]);
    });

    it('should put all elements in matching when predicate always returns true', () => {
      const [matching, nonMatching] = partition([1, 2, 3], () => true);
      expect(matching).toEqual([1, 2, 3]);
      expect(nonMatching).toEqual([]);
    });

    it('should put all elements in nonMatching when predicate always returns false', () => {
      const [matching, nonMatching] = partition([1, 2, 3], () => false);
      expect(matching).toEqual([]);
      expect(nonMatching).toEqual([1, 2, 3]);
    });

    it('should handle a single-element array matching the predicate', () => {
      const [matching, nonMatching] = partition([42], (n) => n > 0);
      expect(matching).toEqual([42]);
      expect(nonMatching).toEqual([]);
    });

    it('should handle a single-element array not matching the predicate', () => {
      const [matching, nonMatching] = partition([42], (n) => n < 0);
      expect(matching).toEqual([]);
      expect(nonMatching).toEqual([42]);
    });

    it('should maintain element order within each partition', () => {
      const [evens, odds] = partition([1, 2, 3, 4, 5, 6], (n) => n % 2 === 0);
      expect(evens).toEqual([2, 4, 6]);
      expect(odds).toEqual([1, 3, 5]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [1, 2, 3, 4, 5];
      const copy = [...original];
      partition(original, (n) => n % 2 === 0);
      expect(original).toEqual(copy);
    });

    it('should return new array references', () => {
      const original = [1, 2, 3];
      const [matching, nonMatching] = partition(original, (n) => n > 1);
      expect(matching).not.toBe(original);
      expect(nonMatching).not.toBe(original);
    });
  });

  describe('return structure', () => {
    it('should always return a tuple of exactly two arrays', () => {
      const result = partition([1, 2, 3], (n) => n > 1);
      expect(result).toHaveLength(2);
      expect(Array.isArray(result[0])).toBe(true);
      expect(Array.isArray(result[1])).toBe(true);
    });

    it('should have matching and nonMatching arrays that together contain all elements', () => {
      const input = [1, 2, 3, 4, 5];
      const [matching, nonMatching] = partition(input, (n) => n % 2 === 0);
      const combined = [...matching, ...nonMatching].sort();
      expect(combined).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not an array', () => {
      expect(() =>
        partition('not an array' as unknown as unknown[], () => true),
      ).toThrow(TypeError);
      expect(() =>
        partition('not an array' as unknown as unknown[], () => true),
      ).toThrow('First argument must be an array');
    });

    it('should throw TypeError for null input', () => {
      expect(() => partition(null as unknown as unknown[], () => true)).toThrow(
        TypeError,
      );
    });

    it('should throw TypeError for undefined input', () => {
      expect(() =>
        partition(undefined as unknown as unknown[], () => true),
      ).toThrow(TypeError);
    });
  });
});
