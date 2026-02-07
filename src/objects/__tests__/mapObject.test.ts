import { mapObject } from '../mapObject';

describe('mapObject', () => {
  describe('happy path', () => {
    it('should map values with a doubling function', () => {
      const result = mapObject({ a: 1, b: 2, c: 3 }, (v) => v * 2);
      expect(result).toEqual({ a: 2, b: 4, c: 6 });
    });

    it('should map string values to uppercase', () => {
      const result = mapObject({ name: 'alice', role: 'admin' }, (v) =>
        v.toUpperCase(),
      );
      expect(result).toEqual({ name: 'ALICE', role: 'ADMIN' });
    });

    it('should map values to a different type', () => {
      const result = mapObject({ a: 1, b: 2 }, (v) => String(v));
      expect(result).toEqual({ a: '1', b: '2' });
    });

    it('should pass the key as second argument', () => {
      const result = mapObject({ a: 1, b: 2 }, (v, k) => `${k}:${v}`);
      expect(result).toEqual({ a: 'a:1', b: 'b:2' });
    });
  });

  describe('transformation functions', () => {
    it('should apply boolean transformation', () => {
      const result = mapObject({ a: 0, b: 1, c: 2 }, (v) => v > 0);
      expect(result).toEqual({ a: false, b: true, c: true });
    });

    it('should apply object wrapping transformation', () => {
      const result = mapObject({ x: 1, y: 2 }, (v) => ({ value: v }));
      expect(result).toEqual({ x: { value: 1 }, y: { value: 2 } });
    });

    it('should apply array wrapping transformation', () => {
      const result = mapObject({ a: 'hello' }, (v) => v.split(''));
      expect(result).toEqual({ a: ['h', 'e', 'l', 'l', 'o'] });
    });

    it('should apply identity function', () => {
      const result = mapObject({ a: 1, b: 2 }, (v) => v);
      expect(result).toEqual({ a: 1, b: 2 });
    });
  });

  describe('edge cases', () => {
    it('should return empty object for empty input', () => {
      const result = mapObject({}, (v) => v);
      expect(result).toEqual({});
    });

    it('should handle single key object', () => {
      const result = mapObject({ only: 42 }, (v) => v + 1);
      expect(result).toEqual({ only: 43 });
    });

    it('should handle null and undefined values', () => {
      const result = mapObject(
        { a: null, b: undefined } as Record<string, unknown>,
        (v) => (v === null ? 'null' : 'undefined'),
      );
      expect(result).toEqual({ a: 'null', b: 'undefined' });
    });

    it('should handle objects with many keys', () => {
      const input: Record<string, number> = {};
      const expected: Record<string, number> = {};
      for (let i = 0; i < 100; i++) {
        input[`key${i}`] = i;
        expected[`key${i}`] = i * 2;
      }
      const result = mapObject(input, (v) => v * 2);
      expect(result).toEqual(expected);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original object', () => {
      const original = { a: 1, b: 2, c: 3 };
      mapObject(original, (v) => v * 2);
      expect(original).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should return a new object reference', () => {
      const original = { a: 1 };
      const result = mapObject(original, (v) => v);
      expect(result).not.toBe(original);
    });
  });

  describe('type preservation', () => {
    it('should preserve key names', () => {
      const result = mapObject({ foo: 1, bar: 2 }, (v) => v);
      expect(Object.keys(result)).toEqual(['foo', 'bar']);
    });

    it('should allow mapping to complex types', () => {
      const result = mapObject({ a: 1 }, (v) => new Date(v));
      expect(result.a).toBeInstanceOf(Date);
    });
  });
});
