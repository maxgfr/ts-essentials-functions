import { removeEmptyFieldObject } from '../removeEmpty';

describe('removeEmptyFieldObject', () => {
  describe('happy path', () => {
    it('should remove undefined fields', () => {
      const result = removeEmptyFieldObject({ a: 1, b: undefined });
      expect(result).toEqual({ a: 1 });
    });

    it('should keep null fields', () => {
      const result = removeEmptyFieldObject({ a: 1, b: null });
      expect(result).toEqual({ a: 1, b: null });
    });

    it('should keep empty string fields', () => {
      const result = removeEmptyFieldObject({ a: 1, b: '' });
      expect(result).toEqual({ a: 1, b: '' });
    });

    it('should keep zero values', () => {
      const result = removeEmptyFieldObject({ a: 0, b: false });
      expect(result).toEqual({ a: 0, b: false });
    });

    it('should remove multiple undefined fields', () => {
      const result = removeEmptyFieldObject({
        a: 1,
        b: undefined,
        c: 'hello',
        d: undefined,
      });
      expect(result).toEqual({ a: 1, c: 'hello' });
    });
  });

  describe('nested objects', () => {
    it('should recursively remove undefined from nested objects', () => {
      const result = removeEmptyFieldObject({
        a: 1,
        b: { c: undefined, d: 2 },
      });
      expect(result).toEqual({ a: 1, b: { d: 2 } });
    });

    it('should handle deeply nested undefined values', () => {
      const result = removeEmptyFieldObject({
        level1: {
          level2: {
            level3: {
              keep: 'value',
              remove: undefined,
            },
          },
        },
      });
      expect(result).toEqual({
        level1: { level2: { level3: { keep: 'value' } } },
      });
    });

    it('should handle nested objects that become empty', () => {
      const result = removeEmptyFieldObject({
        a: { b: undefined },
      });
      expect(result).toEqual({ a: {} });
    });

    it('should handle arrays as object values (arrays are objects)', () => {
      const result = removeEmptyFieldObject({
        items: [1, 2, 3],
      } as Record<string, any>);
      // Arrays are recursed into as objects with numeric string keys
      expect(result.items).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should return empty object for empty input', () => {
      const result = removeEmptyFieldObject({});
      expect(result).toEqual({});
    });

    it('should return empty object when all fields are undefined', () => {
      const result = removeEmptyFieldObject({
        a: undefined,
        b: undefined,
        c: undefined,
      });
      expect(result).toEqual({});
    });

    it('should handle object with only one key', () => {
      expect(removeEmptyFieldObject({ a: undefined })).toEqual({});
      expect(removeEmptyFieldObject({ a: 1 })).toEqual({ a: 1 });
    });

    it('should handle NaN values (kept, not undefined)', () => {
      const result = removeEmptyFieldObject({ a: NaN });
      expect(result.a).toBeNaN();
    });

    it('should handle mixed types', () => {
      const result = removeEmptyFieldObject({
        str: 'hello',
        num: 42,
        bool: true,
        nil: null,
        undef: undefined,
        arr: [1, 2] as any,
        obj: { x: 1 },
      });
      expect(result.str).toBe('hello');
      expect(result.num).toBe(42);
      expect(result.bool).toBe(true);
      expect(result.nil).toBeNull();
      expect('undef' in result).toBe(false);
      expect(result.obj).toEqual({ x: 1 });
    });
  });

  describe('circular references', () => {
    it('should handle circular references without infinite loop', () => {
      const obj: Record<string, any> = { a: 1 };
      obj.self = obj;
      const result = removeEmptyFieldObject(obj);
      expect(result.a).toBe(1);
      // Circular ref returns the original visited object
      expect(result.self).toBe(obj);
    });

    it('should handle mutual circular references', () => {
      const a: Record<string, any> = { value: 1 };
      const b: Record<string, any> = { value: 2 };
      a.ref = b;
      b.ref = a;
      const result = removeEmptyFieldObject(a);
      expect(result.value).toBe(1);
      expect(result.ref.value).toBe(2);
    });

    it('should still remove undefined in objects with circular refs', () => {
      const obj: Record<string, any> = { a: 1, b: undefined };
      obj.self = obj;
      const result = removeEmptyFieldObject(obj);
      expect(result.a).toBe(1);
      expect('b' in result).toBe(false);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original object', () => {
      const original = { a: 1, b: undefined, c: { d: undefined, e: 2 } };
      removeEmptyFieldObject(original);
      expect(original.a).toBe(1);
      expect(original.b).toBeUndefined();
      expect(original.c.d).toBeUndefined();
      expect(original.c.e).toBe(2);
      expect(Object.keys(original)).toEqual(['a', 'b', 'c']);
    });

    it('should return a new object reference', () => {
      const original = { a: 1 };
      const result = removeEmptyFieldObject(original);
      expect(result).not.toBe(original);
    });

    it('should return new nested object references', () => {
      const nested = { x: 1, y: undefined };
      const original = { outer: nested };
      const result = removeEmptyFieldObject(original);
      expect(result.outer).not.toBe(nested);
    });
  });
});
