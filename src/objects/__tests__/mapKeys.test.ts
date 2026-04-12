import { mapKeys } from '../mapKeys';

describe('mapKeys', () => {
  describe('happy path', () => {
    it('should transform keys using the function', () => {
      expect(mapKeys({ a: 1, b: 2 }, (key) => key.toUpperCase())).toEqual({
        A: 1,
        B: 2,
      });
    });

    it('should pass value as second argument', () => {
      const result = mapKeys(
        { name: 'Alice', role: 'admin' },
        (key) => `user_${key}`,
      );
      expect(result).toEqual({ user_name: 'Alice', user_role: 'admin' });
    });

    it('should preserve values', () => {
      const obj = { x: { nested: true }, y: [1, 2] };
      const result = mapKeys(obj, (key) => key.toUpperCase());
      expect(result).toEqual({ X: { nested: true }, Y: [1, 2] });
    });
  });

  describe('edge cases', () => {
    it('should return empty object for empty input', () => {
      expect(mapKeys({}, (key) => key)).toEqual({});
    });

    it('should handle key collisions (last wins)', () => {
      const result = mapKeys({ a: 1, b: 2 }, () => 'same');
      expect(result).toEqual({ same: 2 });
    });
  });

  describe('immutability', () => {
    it('should not mutate the original object', () => {
      const original = { a: 1, b: 2 };
      const copy = { ...original };
      mapKeys(original, (key) => key.toUpperCase());
      expect(original).toEqual(copy);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not an object', () => {
      expect(() =>
        mapKeys('not' as unknown as Record<string, unknown>, (k) => k),
      ).toThrow(TypeError);
      expect(() =>
        mapKeys('not' as unknown as Record<string, unknown>, (k) => k),
      ).toThrow('First argument must be a plain object');
    });

    it('should throw TypeError when second argument is not a function', () => {
      expect(() =>
        mapKeys(
          { a: 1 },
          'not' as unknown as (key: string, value: unknown) => string,
        ),
      ).toThrow(TypeError);
      expect(() =>
        mapKeys(
          { a: 1 },
          'not' as unknown as (key: string, value: unknown) => string,
        ),
      ).toThrow('Second argument must be a function');
    });
  });
});
