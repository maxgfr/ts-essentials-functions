import { hasObjectNullOrUndefined } from '../hasObjectNullOrUndefined';

describe('hasObjectNullOrUndefined', () => {
  describe('happy path', () => {
    it('should return true for null', () => {
      expect(hasObjectNullOrUndefined(null)).toBe(true);
    });

    it('should return true for undefined', () => {
      expect(hasObjectNullOrUndefined(undefined)).toBe(true);
    });

    it('should return true for NaN', () => {
      expect(hasObjectNullOrUndefined(NaN)).toBe(true);
    });

    it('should return false for a valid number', () => {
      expect(hasObjectNullOrUndefined(42)).toBe(false);
    });

    it('should return false for a valid string', () => {
      expect(hasObjectNullOrUndefined('hello')).toBe(false);
    });

    it('should return false for a boolean', () => {
      expect(hasObjectNullOrUndefined(true)).toBe(false);
      expect(hasObjectNullOrUndefined(false)).toBe(false);
    });

    it('should return false for zero', () => {
      expect(hasObjectNullOrUndefined(0)).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(hasObjectNullOrUndefined('')).toBe(false);
    });
  });

  describe('objects with null/undefined values', () => {
    it('should return true when object has null value', () => {
      expect(hasObjectNullOrUndefined({ a: 1, b: null })).toBe(true);
    });

    it('should return true when object has undefined value', () => {
      expect(hasObjectNullOrUndefined({ a: 1, b: undefined })).toBe(true);
    });

    it('should return true when object has NaN value', () => {
      expect(hasObjectNullOrUndefined({ a: 1, b: NaN })).toBe(true);
    });

    it('should return false when object has no null/undefined/NaN', () => {
      expect(hasObjectNullOrUndefined({ a: 1, b: 'hello', c: true })).toBe(false);
    });
  });

  describe('nested objects', () => {
    it('should detect null in nested object', () => {
      expect(hasObjectNullOrUndefined({ a: { b: { c: null } } })).toBe(true);
    });

    it('should detect undefined in deeply nested object', () => {
      expect(
        hasObjectNullOrUndefined({ a: { b: { c: { d: undefined } } } }),
      ).toBe(true);
    });

    it('should detect NaN in nested object', () => {
      expect(hasObjectNullOrUndefined({ a: { b: NaN } })).toBe(true);
    });

    it('should return false for deeply nested valid values', () => {
      expect(
        hasObjectNullOrUndefined({
          a: { b: { c: { d: 'valid' } } },
        }),
      ).toBe(false);
    });

    it('should handle mixed nesting with arrays', () => {
      expect(
        hasObjectNullOrUndefined({ a: [1, 2, null] }),
      ).toBe(true);
    });

    it('should return false for arrays with all valid values', () => {
      expect(hasObjectNullOrUndefined({ a: [1, 2, 3] })).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return false for an empty object', () => {
      expect(hasObjectNullOrUndefined({})).toBe(false);
    });

    it('should return false for an empty array', () => {
      expect(hasObjectNullOrUndefined([])).toBe(false);
    });

    it('should handle objects with zero values', () => {
      expect(hasObjectNullOrUndefined({ a: 0, b: '' })).toBe(false);
    });

    it('should handle objects with false values', () => {
      expect(hasObjectNullOrUndefined({ a: false })).toBe(false);
    });
  });

  describe('circular references', () => {
    it('should handle circular references without infinite loop', () => {
      const obj: Record<string, unknown> = { a: 1 };
      obj.self = obj;
      expect(hasObjectNullOrUndefined(obj)).toBe(false);
    });

    it('should still detect null in circular reference object', () => {
      const obj: Record<string, unknown> = { a: 1, b: null };
      obj.self = obj;
      expect(hasObjectNullOrUndefined(obj)).toBe(true);
    });

    it('should handle mutual circular references', () => {
      const a: Record<string, unknown> = { value: 1 };
      const b: Record<string, unknown> = { value: 2 };
      a.ref = b;
      b.ref = a;
      expect(hasObjectNullOrUndefined(a)).toBe(false);
    });

    it('should detect null in mutual circular reference', () => {
      const a: Record<string, unknown> = { value: null };
      const b: Record<string, unknown> = { value: 2 };
      a.ref = b;
      b.ref = a;
      expect(hasObjectNullOrUndefined(a)).toBe(true);
    });
  });
});
