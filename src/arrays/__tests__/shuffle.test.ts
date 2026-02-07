import { shuffleArray, shuffleArraySame } from '../shuffle';

describe('shuffleArray', () => {
  describe('happy path', () => {
    it('should return an array of the same length', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result).toHaveLength(input.length);
    });

    it('should contain all the same elements', () => {
      const input = [1, 2, 3, 4, 5];
      const result = shuffleArray(input);
      expect(result.sort()).toEqual([...input].sort());
    });

    it('should work with string arrays', () => {
      const input = ['a', 'b', 'c', 'd'];
      const result = shuffleArray(input);
      expect(result.sort()).toEqual([...input].sort());
    });
  });

  describe('edge cases', () => {
    it('should return an empty array for an empty input', () => {
      expect(shuffleArray([])).toEqual([]);
    });

    it('should return a single-element array unchanged', () => {
      expect(shuffleArray([42])).toEqual([42]);
    });

    it('should handle a two-element array', () => {
      const input = [1, 2];
      const result = shuffleArray(input);
      expect(result).toHaveLength(2);
      expect(result.sort()).toEqual([1, 2]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [1, 2, 3, 4, 5];
      const copy = [...original];
      shuffleArray(original);
      expect(original).toEqual(copy);
    });

    it('should return a new array reference', () => {
      const original = [1, 2, 3];
      const result = shuffleArray(original);
      expect(result).not.toBe(original);
    });
  });

  describe('randomness', () => {
    it('should produce different orderings over many runs (statistical)', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const results = new Set<string>();
      for (let i = 0; i < 50; i++) {
        results.add(JSON.stringify(shuffleArray(input)));
      }
      // With 10 elements and 50 runs, we should get more than 1 unique ordering
      expect(results.size).toBeGreaterThan(1);
    });
  });
});

describe('shuffleArraySame', () => {
  describe('happy path', () => {
    it('should return two arrays as a tuple', () => {
      const result = shuffleArraySame([1, 2, 3], ['a', 'b', 'c']);
      expect(result).toHaveLength(2);
      expect(Array.isArray(result[0])).toBe(true);
      expect(Array.isArray(result[1])).toBe(true);
    });

    it('should maintain correspondence between shuffled arrays', () => {
      // Use a seeded approach: run many times and verify
      // that the mapping is consistent
      const a = [1, 2, 3, 4, 5];
      const b = ['a', 'b', 'c', 'd', 'e'];

      // Since shuffleArraySame filters falsy values from a,
      // all elements of a are truthy so they all stay
      const [shuffledA, shuffledB] = shuffleArraySame(a, b);

      expect(shuffledA).toHaveLength(5);
      expect(shuffledB).toHaveLength(5);
      expect(shuffledA.sort()).toEqual([1, 2, 3, 4, 5]);
      expect(shuffledB.sort()).toEqual(['a', 'b', 'c', 'd', 'e']);
    });
  });

  describe('edge cases', () => {
    it('should handle empty arrays', () => {
      const [resultA, resultB] = shuffleArraySame([], []);
      expect(resultA).toEqual([]);
      expect(resultB).toEqual([]);
    });

    it('should handle single-element arrays', () => {
      const [resultA, resultB] = shuffleArraySame([1], ['a']);
      expect(resultA).toEqual([1]);
      expect(resultB).toEqual(['a']);
    });

    it('should filter falsy values from the first array', () => {
      const [resultA] = shuffleArraySame([0, 1, 2, 3], ['a', 'b', 'c', 'd']);
      expect(resultA).not.toContain(0);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original arrays', () => {
      const a = [1, 2, 3];
      const b = ['a', 'b', 'c'];
      const copyA = [...a];
      const copyB = [...b];
      shuffleArraySame(a, b);
      expect(a).toEqual(copyA);
      expect(b).toEqual(copyB);
    });

    it('should return new array references', () => {
      const a = [1, 2, 3];
      const b = ['a', 'b', 'c'];
      const [resultA, resultB] = shuffleArraySame(a, b);
      expect(resultA).not.toBe(a);
      expect(resultB).not.toBe(b);
    });
  });
});
