import { uniqueBy } from '../uniqueBy';

describe('uniqueBy', () => {
  describe('happy path', () => {
    it('should deduplicate by key function', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 1, name: 'Alice (duplicate)' },
      ];
      expect(uniqueBy(users, (u) => u.id)).toEqual([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]);
    });

    it('should keep first occurrence', () => {
      const items = [
        { key: 'a', value: 1 },
        { key: 'a', value: 2 },
      ];
      expect(uniqueBy(items, (i) => i.key)).toEqual([{ key: 'a', value: 1 }]);
    });

    it('should work with primitive arrays and identity function', () => {
      expect(uniqueBy([1, 2, 2, 3], (x) => x)).toEqual([1, 2, 3]);
    });
  });

  describe('edge cases', () => {
    it('should return empty array for empty input', () => {
      expect(uniqueBy([], (x) => x)).toEqual([]);
    });

    it('should handle single element', () => {
      expect(uniqueBy([{ id: 1 }], (x) => x.id)).toEqual([{ id: 1 }]);
    });

    it('should handle all unique elements', () => {
      const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
      expect(uniqueBy(items, (x) => x.id)).toEqual(items);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [{ id: 1 }, { id: 2 }, { id: 1 }];
      const copy = [...original];
      uniqueBy(original, (x) => x.id);
      expect(original).toEqual(copy);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not an array', () => {
      expect(() =>
        uniqueBy('not an array' as unknown as unknown[], (x) => x),
      ).toThrow(TypeError);
      expect(() =>
        uniqueBy('not an array' as unknown as unknown[], (x) => x),
      ).toThrow('First argument must be an array');
    });

    it('should throw TypeError when second argument is not a function', () => {
      expect(() =>
        uniqueBy(
          [1, 2],
          'not a function' as unknown as (x: unknown) => unknown,
        ),
      ).toThrow(TypeError);
      expect(() =>
        uniqueBy(
          [1, 2],
          'not a function' as unknown as (x: unknown) => unknown,
        ),
      ).toThrow('Second argument must be a function');
    });
  });
});
