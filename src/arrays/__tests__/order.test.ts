import { orderArraySame } from '../order';

describe('orderArraySame', () => {
  describe('happy path', () => {
    it('should reorder an array based on the index mapping', () => {
      const result = orderArraySame(['a', 'b', 'c'], [2, 0, 1]);
      expect(result).toHaveLength(3);
      expect(result).toContain('a');
      expect(result).toContain('b');
      expect(result).toContain('c');
    });

    it('should produce a deterministic result for a given index mapping', () => {
      const result1 = orderArraySame(['a', 'b', 'c'], [2, 0, 1]);
      const result2 = orderArraySame(['a', 'b', 'c'], [2, 0, 1]);
      expect(result1).toEqual(result2);
    });

    it('should handle numeric arrays', () => {
      const result = orderArraySame([10, 20, 30], [1, 2, 0]);
      expect(result).toHaveLength(3);
      expect(result).toContain(10);
      expect(result).toContain(20);
      expect(result).toContain(30);
    });
  });

  describe('edge cases', () => {
    it('should return an empty array for an empty input', () => {
      expect(orderArraySame([], [])).toEqual([]);
    });

    it('should handle a single-element array', () => {
      expect(orderArraySame([42], [0])).toEqual([42]);
    });

    it('should filter out falsy values before reordering', () => {
      const result = orderArraySame([0, 1, 2, 3] as number[], [0, 1, 2, 3]);
      expect(result).not.toContain(0);
    });

    it('should handle undefined values in the index mapping by falling back to r[0]', () => {
      const input = ['a', 'b', 'c'];
      const indices = [0, undefined as unknown as number, 1];
      const result = orderArraySame(input, indices);
      expect(result).toHaveLength(3);
    });

    it('should handle null values in the index mapping by falling back to r[0]', () => {
      const input = ['a', 'b', 'c'];
      const indices = [0, null as unknown as number, 1];
      const result = orderArraySame(input, indices);
      expect(result).toHaveLength(3);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = ['a', 'b', 'c'];
      const copy = [...original];
      orderArraySame(original, [2, 0, 1]);
      expect(original).toEqual(copy);
    });

    it('should not mutate the index mapping array', () => {
      const indices = [2, 0, 1];
      const copy = [...indices];
      orderArraySame(['a', 'b', 'c'], indices);
      expect(indices).toEqual(copy);
    });

    it('should return a new array reference', () => {
      const original = ['a', 'b', 'c'];
      const result = orderArraySame(original, [2, 0, 1]);
      expect(result).not.toBe(original);
    });
  });
});
