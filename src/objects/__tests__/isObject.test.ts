import { isObject } from '../isObject';

describe('isObject', () => {
  describe('should return true for objects', () => {
    it('should return true for plain objects', () => {
      expect(isObject({})).toBe(true);
    });

    it('should return true for objects with properties', () => {
      expect(isObject({ a: 1 })).toBe(true);
    });

    it('should return true for arrays', () => {
      expect(isObject([])).toBe(true);
      expect(isObject([1, 2, 3])).toBe(true);
    });

    it('should return true for Date objects', () => {
      expect(isObject(new Date())).toBe(true);
    });

    it('should return true for RegExp objects', () => {
      expect(isObject(/test/)).toBe(true);
    });

    it('should return true for Map objects', () => {
      expect(isObject(new Map())).toBe(true);
    });

    it('should return true for Set objects', () => {
      expect(isObject(new Set())).toBe(true);
    });

    it('should return true for Error objects', () => {
      expect(isObject(new Error('test'))).toBe(true);
    });

    it('should return true for functions', () => {
      expect(isObject(() => {})).toBe(true);
      expect(isObject(function named() {})).toBe(true);
    });

    it('should return true for class instances', () => {
      class TestClass {
        value = 1;
      }
      expect(isObject(new TestClass())).toBe(true);
    });

    it('should return true for Object.create(null)', () => {
      expect(isObject(Object.create(null))).toBe(true);
    });
  });

  describe('should return false for non-objects', () => {
    it('should return false for null', () => {
      expect(isObject(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isObject(undefined)).toBe(false);
    });

    it('should return false for numbers', () => {
      expect(isObject(0)).toBe(false);
      expect(isObject(42)).toBe(false);
      expect(isObject(-1)).toBe(false);
      expect(isObject(NaN)).toBe(false);
      expect(isObject(Infinity)).toBe(false);
    });

    it('should return false for strings', () => {
      expect(isObject('')).toBe(false);
      expect(isObject('hello')).toBe(false);
    });

    it('should return false for booleans', () => {
      expect(isObject(true)).toBe(false);
      expect(isObject(false)).toBe(false);
    });

    it('should return false for symbols', () => {
      expect(isObject(Symbol('test'))).toBe(false);
    });

    it('should return false for bigint', () => {
      expect(isObject(BigInt(42))).toBe(false);
    });
  });

  describe('type guard behavior', () => {
    it('should narrow type to object', () => {
      const value: unknown = { a: 1 };
      if (isObject(value)) {
        // This should compile - value is narrowed to object
        expect(typeof value).toBe('object');
      }
    });

    it('should allow accessing object in narrowed branch', () => {
      const value: unknown = [1, 2, 3];
      if (isObject(value)) {
        expect(Array.isArray(value)).toBe(true);
      }
    });
  });
});
