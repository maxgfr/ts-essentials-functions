import { groupBy } from '../groupBy';

describe('groupBy', () => {
  describe('happy path', () => {
    it('should group objects by a string property', () => {
      const users = [
        { name: 'Alice', role: 'admin' },
        { name: 'Bob', role: 'user' },
        { name: 'Charlie', role: 'admin' },
      ];
      const result = groupBy(users, (u) => u.role);
      expect(result.get('admin')).toEqual([
        { name: 'Alice', role: 'admin' },
        { name: 'Charlie', role: 'admin' },
      ]);
      expect(result.get('user')).toEqual([{ name: 'Bob', role: 'user' }]);
    });

    it('should group numbers by a computed key', () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const result = groupBy(numbers, (n) => (n % 2 === 0 ? 'even' : 'odd'));
      expect(result.get('even')).toEqual([2, 4, 6]);
      expect(result.get('odd')).toEqual([1, 3, 5]);
    });

    it('should group strings by their length', () => {
      const words = ['hi', 'hey', 'hello', 'yo', 'yes'];
      const result = groupBy(words, (w) => w.length);
      expect(result.get(2)).toEqual(['hi', 'yo']);
      expect(result.get(3)).toEqual(['hey', 'yes']);
      expect(result.get(5)).toEqual(['hello']);
    });

    it('should return a Map instance', () => {
      const result = groupBy([1, 2], (n) => n);
      expect(result).toBeInstanceOf(Map);
    });
  });

  describe('edge cases', () => {
    it('should return an empty Map for an empty array', () => {
      const result = groupBy([], (x) => x);
      expect(result.size).toBe(0);
    });

    it('should handle a single-element array', () => {
      const result = groupBy([42], () => 'group');
      expect(result.get('group')).toEqual([42]);
      expect(result.size).toBe(1);
    });

    it('should handle all elements in the same group', () => {
      const result = groupBy([1, 2, 3], () => 'all');
      expect(result.get('all')).toEqual([1, 2, 3]);
      expect(result.size).toBe(1);
    });

    it('should handle all elements in different groups', () => {
      const result = groupBy([1, 2, 3], (n) => n);
      expect(result.size).toBe(3);
      expect(result.get(1)).toEqual([1]);
      expect(result.get(2)).toEqual([2]);
      expect(result.get(3)).toEqual([3]);
    });

    it('should handle numeric keys', () => {
      const result = groupBy([10, 20, 30], (n) => Math.floor(n / 15));
      expect(result.get(0)).toEqual([10]);
      expect(result.get(1)).toEqual([20]);
      expect(result.get(2)).toEqual([30]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [1, 2, 3, 4];
      const copy = [...original];
      groupBy(original, (n) => (n % 2 === 0 ? 'even' : 'odd'));
      expect(original).toEqual(copy);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not an array', () => {
      expect(() =>
        groupBy('not an array' as unknown as string[], (x) => x),
      ).toThrow(TypeError);
      expect(() =>
        groupBy('not an array' as unknown as string[], (x) => x),
      ).toThrow('First argument must be an array');
    });

    it('should throw TypeError for null input', () => {
      expect(() => groupBy(null as unknown as string[], (x) => x)).toThrow(
        TypeError,
      );
    });

    it('should throw TypeError for undefined input', () => {
      expect(() => groupBy(undefined as unknown as string[], (x) => x)).toThrow(
        TypeError,
      );
    });
  });
});
