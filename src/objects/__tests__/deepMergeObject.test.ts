import { deepMergeObject } from '../deepMergeObject';

describe('deepMergeObject', () => {
  describe('happy path', () => {
    it('should merge flat objects', () => {
      expect(deepMergeObject({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
    });

    it('should deeply merge nested objects', () => {
      const target = { a: 1, b: { c: 2, d: 3 } };
      const source = { b: { c: 10 }, e: 4 };
      expect(deepMergeObject(target, source)).toEqual({
        a: 1,
        b: { c: 10, d: 3 },
        e: 4,
      });
    });

    it('should override with source values', () => {
      expect(deepMergeObject({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    });

    it('should replace arrays (not concatenate)', () => {
      expect(deepMergeObject({ a: [1, 2] }, { a: [3] })).toEqual({
        a: [3],
      });
    });
  });

  describe('edge cases', () => {
    it('should handle empty target', () => {
      expect(deepMergeObject({}, { a: 1 })).toEqual({ a: 1 });
    });

    it('should handle empty source', () => {
      expect(deepMergeObject({ a: 1 }, {})).toEqual({ a: 1 });
    });

    it('should handle deeply nested merge', () => {
      const target = { a: { b: { c: { d: 1 } } } };
      const source = { a: { b: { c: { e: 2 } } } };
      expect(deepMergeObject(target, source)).toEqual({
        a: { b: { c: { d: 1, e: 2 } } },
      });
    });
  });

  describe('immutability', () => {
    it('should not mutate the target', () => {
      const target = { a: 1, b: { c: 2 } };
      const copy = JSON.parse(JSON.stringify(target));
      deepMergeObject(target, { b: { c: 10 } });
      expect(target).toEqual(copy);
    });

    it('should not mutate the source', () => {
      const source = { a: 1 };
      const copy = { ...source };
      deepMergeObject({ b: 2 }, source);
      expect(source).toEqual(copy);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not an object', () => {
      expect(() =>
        deepMergeObject('not' as unknown as Record<string, unknown>, {}),
      ).toThrow(TypeError);
      expect(() =>
        deepMergeObject('not' as unknown as Record<string, unknown>, {}),
      ).toThrow('First argument must be a plain object');
    });

    it('should throw TypeError when second argument is not an object', () => {
      expect(() =>
        deepMergeObject({}, 'not' as unknown as Record<string, unknown>),
      ).toThrow(TypeError);
    });

    it('should throw TypeError for null arguments', () => {
      expect(() =>
        deepMergeObject(null as unknown as Record<string, unknown>, {}),
      ).toThrow(TypeError);
    });

    it('should throw TypeError for array arguments', () => {
      expect(() =>
        deepMergeObject([] as unknown as Record<string, unknown>, {}),
      ).toThrow(TypeError);
    });
  });
});
