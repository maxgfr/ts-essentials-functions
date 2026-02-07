import { cleanObject } from '../cleanObject';

describe('cleanObject', () => {
  describe('happy path', () => {
    it('should remove null values', () => {
      const result = cleanObject({ a: 1, b: null });
      expect(result).toEqual({ a: 1 });
    });

    it('should remove undefined values', () => {
      const result = cleanObject({ a: 1, b: undefined });
      expect(result).toEqual({ a: 1 });
    });

    it('should remove NaN values', () => {
      const result = cleanObject({ a: 1, b: NaN });
      expect(result).toEqual({ a: 1 });
    });

    it('should remove empty string values', () => {
      const result = cleanObject({ a: 1, b: '' });
      expect(result).toEqual({ a: 1 });
    });

    it('should remove all default values at once', () => {
      const result = cleanObject({
        a: 1,
        b: null,
        c: undefined,
        d: NaN,
        e: '',
      });
      expect(result).toEqual({ a: 1 });
    });

    it('should keep zero values', () => {
      const result = cleanObject({ a: 0, b: false });
      expect(result).toEqual({ a: 0, b: false });
    });

    it('should keep non-empty strings', () => {
      const result = cleanObject({ a: 'hello', b: ' ' });
      expect(result).toEqual({ a: 'hello', b: ' ' });
    });
  });

  describe('nested objects', () => {
    it('should clean nested objects recursively', () => {
      const result = cleanObject({
        a: 1,
        b: { c: null, d: 2, e: { f: undefined, g: 3 } },
      });
      expect(result).toEqual({ a: 1, b: { d: 2, e: { g: 3 } } });
    });

    it('should handle deeply nested structures', () => {
      const result = cleanObject({
        level1: {
          level2: {
            level3: {
              keep: 'value',
              remove: null,
            },
          },
        },
      });
      expect(result).toEqual({
        level1: { level2: { level3: { keep: 'value' } } },
      });
    });

    it('should clean nested objects that become empty after cleaning', () => {
      const result = cleanObject({
        a: { b: null, c: undefined },
      });
      expect(result).toEqual({ a: {} });
    });
  });

  describe('arrays', () => {
    it('should filter default values from arrays', () => {
      const input = [1, null, 2, undefined, 3, '', NaN] as unknown as Record<
        string,
        unknown
      >;
      const result = cleanObject(input);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should clean objects nested inside arrays', () => {
      const input = [
        { a: 1, b: null },
        { c: undefined, d: 2 },
      ] as unknown as Record<string, unknown>;
      const result = cleanObject(input);
      expect(result).toEqual([{ a: 1 }, { d: 2 }]);
    });

    it('should handle arrays nested in objects', () => {
      const result = cleanObject({
        items: [1, null, 2] as unknown as Record<string, unknown>,
      });
      expect(result).toEqual({ items: [1, 2] });
    });
  });

  describe('custom defaults', () => {
    it('should only remove specified defaults', () => {
      const result = cleanObject({ a: 1, b: null, c: undefined }, [null]);
      expect(result).toEqual({ a: 1, c: undefined });
    });

    it('should remove custom values', () => {
      const result = cleanObject(
        { a: 1, b: 0, c: false } as Record<string, unknown>,
        [0, false],
      );
      expect(result).toEqual({ a: 1 });
    });

    it('should handle NaN in custom defaults', () => {
      const result = cleanObject({ a: 1, b: NaN, c: null }, [NaN]);
      expect(result).toEqual({ a: 1, c: null });
    });

    it('should return shallow copy when defaults array is empty', () => {
      const input = { a: 1, b: null };
      const result = cleanObject(input, []);
      expect(result).toEqual({ a: 1, b: null });
    });
  });

  describe('edge cases', () => {
    it('should return empty object for empty input', () => {
      const result = cleanObject({});
      expect(result).toEqual({});
    });

    it('should return empty object when all values are defaults', () => {
      const result = cleanObject({ a: null, b: undefined, c: NaN, d: '' });
      expect(result).toEqual({});
    });

    it('should handle object with only one key', () => {
      expect(cleanObject({ a: null })).toEqual({});
      expect(cleanObject({ a: 1 })).toEqual({ a: 1 });
    });
  });

  describe('immutability', () => {
    it('should not mutate the original object', () => {
      const original = { a: 1, b: null, c: { d: undefined, e: 2 } };
      const originalCopy = JSON.parse(JSON.stringify(original));
      cleanObject(original);
      expect(original.a).toBe(1);
      expect(original.b).toBeNull();
      expect(original.c.d).toBeUndefined();
      expect(original.c.e).toBe(2);
      // JSON.stringify treats undefined as missing, so check structure manually
      expect(Object.keys(original)).toEqual(Object.keys(originalCopy));
    });

    it('should return a new object reference', () => {
      const input = { a: 1 };
      const result = cleanObject(input);
      expect(result).not.toBe(input);
    });
  });
});
