import { detectNullOrUndefinedOrNaNInArray } from '../detectNullOrUndefinedOrNaN';

describe('detectNullOrUndefinedOrNaNInArray', () => {
  describe('happy path - detecting problematic values', () => {
    it('should detect null in a flat array', () => {
      expect(detectNullOrUndefinedOrNaNInArray([1, 2, null])).toBe(true);
    });

    it('should detect undefined in a flat array', () => {
      expect(detectNullOrUndefinedOrNaNInArray([1, undefined, 3])).toBe(true);
    });

    it('should detect NaN in a flat array', () => {
      expect(detectNullOrUndefinedOrNaNInArray([1, NaN, 3])).toBe(true);
    });

    it('should return false for a clean array', () => {
      expect(detectNullOrUndefinedOrNaNInArray([1, 2, 3])).toBe(false);
    });

    it('should return false for an array of strings', () => {
      expect(detectNullOrUndefinedOrNaNInArray(['a', 'b', 'c'])).toBe(false);
    });
  });

  describe('nested objects', () => {
    it('should detect undefined in nested objects', () => {
      expect(
        detectNullOrUndefinedOrNaNInArray([{ a: undefined }]),
      ).toBe(true);
    });

    it('should detect null in nested objects', () => {
      expect(
        detectNullOrUndefinedOrNaNInArray([{ a: null }]),
      ).toBe(true);
    });

    it('should detect NaN in nested objects', () => {
      expect(
        detectNullOrUndefinedOrNaNInArray([{ a: NaN }]),
      ).toBe(true);
    });

    it('should return false for clean nested objects', () => {
      expect(
        detectNullOrUndefinedOrNaNInArray([{ a: 1, b: 'hello' }]),
      ).toBe(false);
    });

    it('should detect null in deeply nested objects', () => {
      expect(
        detectNullOrUndefinedOrNaNInArray([{ a: { b: { c: null } } }]),
      ).toBe(true);
    });
  });

  describe('nested arrays', () => {
    it('should detect null in nested arrays within objects', () => {
      expect(
        detectNullOrUndefinedOrNaNInArray([{ items: [1, null, 3] }]),
      ).toBe(true);
    });

    it('should return false for clean nested arrays within objects', () => {
      expect(
        detectNullOrUndefinedOrNaNInArray([{ items: [1, 2, 3] }]),
      ).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return false for an empty array', () => {
      expect(detectNullOrUndefinedOrNaNInArray([])).toBe(false);
    });

    it('should handle arrays with 0 and empty strings (valid falsy values)', () => {
      expect(detectNullOrUndefinedOrNaNInArray([0, '', false])).toBe(false);
    });

    it('should handle null at the beginning', () => {
      expect(detectNullOrUndefinedOrNaNInArray([null, 1, 2])).toBe(true);
    });

    it('should handle null at the end', () => {
      expect(detectNullOrUndefinedOrNaNInArray([1, 2, null])).toBe(true);
    });

    it('should handle an array with a single null', () => {
      expect(detectNullOrUndefinedOrNaNInArray([null])).toBe(true);
    });

    it('should handle an array with a single valid value', () => {
      expect(detectNullOrUndefinedOrNaNInArray([42])).toBe(false);
    });

    it('should handle objects with empty keys', () => {
      expect(detectNullOrUndefinedOrNaNInArray([{}])).toBe(false);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [1, 2, null, { a: undefined }];
      const copy = JSON.parse(JSON.stringify(original));
      detectNullOrUndefinedOrNaNInArray(original);
      expect(original).toEqual(copy);
    });
  });
});
