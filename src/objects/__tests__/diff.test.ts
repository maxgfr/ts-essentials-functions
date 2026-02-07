import { diffObject } from '../diff';

describe('diffObject', () => {
  describe('happy path', () => {
    it('should return empty object for identical objects', () => {
      expect(diffObject({ a: 1, b: 2 }, { a: 1, b: 2 })).toEqual({});
    });

    it('should return changed keys with obj1 values', () => {
      expect(diffObject({ a: 1, b: 2 }, { a: 1, b: 3 })).toEqual({ b: 2 });
    });

    it('should detect multiple changes', () => {
      expect(diffObject({ a: 1, b: 2, c: 3 }, { a: 10, b: 2, c: 30 })).toEqual({
        a: 1,
        c: 3,
      });
    });

    it('should detect all keys as different for completely different objects', () => {
      expect(diffObject({ a: 1, b: 2 }, { a: 3, b: 4 })).toEqual({
        a: 1,
        b: 2,
      });
    });
  });

  describe('keys only in one object', () => {
    it('should include keys only in obj1 with obj1 values', () => {
      expect(
        diffObject(
          { a: 1, b: 2 } as Record<string, unknown>,
          { a: 1 } as Record<string, unknown>,
        ),
      ).toEqual({ b: 2 });
    });

    it('should include keys only in obj2 with obj2 values', () => {
      expect(
        diffObject(
          { a: 1 } as Record<string, unknown>,
          { a: 1, b: 2 } as Record<string, unknown>,
        ),
      ).toEqual({ b: 2 });
    });

    it('should handle keys unique to both objects', () => {
      expect(
        diffObject(
          { a: 1, b: 2 } as Record<string, unknown>,
          { a: 1, c: 3 } as Record<string, unknown>,
        ),
      ).toEqual({ b: 2, c: 3 });
    });
  });

  describe('Object.is comparison', () => {
    it('should treat NaN as equal to NaN', () => {
      expect(diffObject({ a: NaN }, { a: NaN })).toEqual({});
    });

    it('should distinguish +0 and -0', () => {
      expect(diffObject({ a: 0 }, { a: -0 })).toEqual({ a: 0 });
    });

    it('should use strict equality for strings', () => {
      expect(diffObject({ a: '1' }, { a: '1' })).toEqual({});
      expect(
        diffObject(
          { a: '1' } as Record<string, unknown>,
          { a: 1 } as Record<string, unknown>,
        ),
      ).toEqual({ a: '1' });
    });
  });

  describe('edge cases', () => {
    it('should return empty object for two empty objects', () => {
      expect(diffObject({}, {})).toEqual({});
    });

    it('should handle default parameters (no args)', () => {
      expect(diffObject()).toEqual({});
    });

    it('should handle one empty object', () => {
      expect(
        diffObject(
          { a: 1 } as Record<string, unknown>,
          {} as Record<string, unknown>,
        ),
      ).toEqual({ a: 1 });
    });

    it('should handle null values', () => {
      expect(diffObject({ a: null }, { a: null })).toEqual({});
      expect(
        diffObject(
          { a: null } as Record<string, unknown>,
          { a: 1 } as Record<string, unknown>,
        ),
      ).toEqual({ a: null });
    });

    it('should handle undefined values', () => {
      expect(diffObject({ a: undefined }, { a: undefined })).toEqual({});
    });

    it('should treat object references as different (not deep compare)', () => {
      const shared = { x: 1 };
      expect(
        diffObject(
          { a: shared } as Record<string, unknown>,
          { a: shared } as Record<string, unknown>,
        ),
      ).toEqual({});
      expect(
        diffObject(
          { a: { x: 1 } } as Record<string, unknown>,
          { a: { x: 1 } } as Record<string, unknown>,
        ),
      ).toEqual({ a: { x: 1 } }); // Different references
    });

    it('should handle boolean values', () => {
      expect(diffObject({ a: true }, { a: false })).toEqual({ a: true });
      expect(diffObject({ a: true }, { a: true })).toEqual({});
    });
  });

  describe('immutability', () => {
    it('should not mutate input objects', () => {
      const obj1 = { a: 1, b: 2 };
      const obj2 = { a: 1, b: 3 };
      const obj1Copy = { ...obj1 };
      const obj2Copy = { ...obj2 };
      diffObject(obj1, obj2);
      expect(obj1).toEqual(obj1Copy);
      expect(obj2).toEqual(obj2Copy);
    });

    it('should return a new object', () => {
      const obj1 = { a: 1 };
      const obj2 = { a: 2 };
      const result = diffObject(obj1, obj2);
      expect(result).not.toBe(obj1);
      expect(result).not.toBe(obj2);
    });
  });
});
