import { deepEqualObject } from '../deepEqualObject';

describe('deepEqualObject', () => {
  describe('happy path', () => {
    it('should return true for identical objects', () => {
      const obj = { a: 1, b: 2 };
      expect(deepEqualObject(obj, obj)).toBe(true);
    });

    it('should return true for equal simple objects', () => {
      expect(deepEqualObject({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });

    it('should return false for objects with different values', () => {
      expect(deepEqualObject({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('should return false for objects with different keys', () => {
      expect(
        deepEqualObject(
          { a: 1 } as Record<string, unknown>,
          { b: 1 } as Record<string, unknown>,
        ),
      ).toBe(false);
    });

    it('should return false for objects with different number of keys', () => {
      expect(
        deepEqualObject({ a: 1, b: 2 }, { a: 1 } as Record<string, unknown>),
      ).toBe(false);
    });
  });

  describe('nested objects', () => {
    it('should return true for deeply equal nested objects', () => {
      const a = { x: { y: { z: 1 } } };
      const b = { x: { y: { z: 1 } } };
      expect(deepEqualObject(a, b)).toBe(true);
    });

    it('should return false for deeply unequal nested objects', () => {
      const a = { x: { y: { z: 1 } } };
      const b = { x: { y: { z: 2 } } };
      expect(deepEqualObject(a, b)).toBe(false);
    });

    it('should handle mixed nesting depths', () => {
      const a = { x: 1, y: { z: 2 } };
      const b = { x: 1, y: { z: 2 } };
      expect(deepEqualObject(a, b)).toBe(true);
    });

    it('should return false when nested structure differs', () => {
      const a = { x: { y: 1 } };
      const b = { x: 1 } as Record<string, unknown>;
      expect(deepEqualObject(a, b)).toBe(false);
    });
  });

  describe('null handling', () => {
    it('should return true when both values are null', () => {
      expect(deepEqualObject({ a: null }, { a: null })).toBe(true);
    });

    it('should return false when one value is null and the other is an object', () => {
      expect(
        deepEqualObject(
          { a: null } as Record<string, unknown>,
          { a: {} } as Record<string, unknown>,
        ),
      ).toBe(false);
    });

    it('should return false when a is falsy (null/undefined)', () => {
      expect(
        deepEqualObject(null as unknown as Record<string, unknown>, { a: 1 }),
      ).toBe(false);
    });

    it('should return false when b is falsy (null/undefined)', () => {
      expect(
        deepEqualObject({ a: 1 }, null as unknown as Record<string, unknown>),
      ).toBe(false);
    });

    it('should return true when both are null', () => {
      expect(
        deepEqualObject(
          null as unknown as Record<string, unknown>,
          null as unknown as Record<string, unknown>,
        ),
      ).toBe(true);
    });
  });

  describe('special values', () => {
    it('should compare NaN correctly using Object.is', () => {
      expect(deepEqualObject({ a: NaN }, { a: NaN })).toBe(true);
    });

    it('should distinguish 0 and -0 using Object.is', () => {
      expect(deepEqualObject({ a: 0 }, { a: -0 })).toBe(false);
    });

    it('should handle undefined values', () => {
      expect(deepEqualObject({ a: undefined }, { a: undefined })).toBe(true);
    });

    it('should handle boolean values', () => {
      expect(deepEqualObject({ a: true }, { a: true })).toBe(true);
      expect(deepEqualObject({ a: true }, { a: false })).toBe(false);
    });

    it('should handle string values', () => {
      expect(deepEqualObject({ a: 'hello' }, { a: 'hello' })).toBe(true);
      expect(deepEqualObject({ a: 'hello' }, { a: 'world' })).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return true for two empty objects', () => {
      expect(deepEqualObject({}, {})).toBe(true);
    });

    it('should handle arrays as values', () => {
      expect(
        deepEqualObject(
          { a: [1, 2, 3] } as Record<string, unknown>,
          { a: [1, 2, 3] } as Record<string, unknown>,
        ),
      ).toBe(true);
    });

    it('should return false for arrays with different elements', () => {
      expect(
        deepEqualObject(
          { a: [1, 2] } as Record<string, unknown>,
          { a: [1, 3] } as Record<string, unknown>,
        ),
      ).toBe(false);
    });

    it('should handle objects with many keys', () => {
      const a: Record<string, number> = {};
      const b: Record<string, number> = {};
      for (let i = 0; i < 100; i++) {
        a[`key${i}`] = i;
        b[`key${i}`] = i;
      }
      expect(deepEqualObject(a, b)).toBe(true);
    });
  });

  describe('circular references', () => {
    it('should handle circular references without infinite loop', () => {
      const a: Record<string, unknown> = { value: 1 };
      a.self = a;
      const b: Record<string, unknown> = { value: 1 };
      b.self = b;
      expect(deepEqualObject(a, b)).toBe(true);
    });

    it('should handle mutual circular references', () => {
      const a1: Record<string, unknown> = { id: 'a1' };
      const a2: Record<string, unknown> = { id: 'a2' };
      a1.ref = a2;
      a2.ref = a1;

      const b1: Record<string, unknown> = { id: 'a1' };
      const b2: Record<string, unknown> = { id: 'a2' };
      b1.ref = b2;
      b2.ref = b1;

      expect(deepEqualObject(a1, b1)).toBe(true);
    });
  });
});
