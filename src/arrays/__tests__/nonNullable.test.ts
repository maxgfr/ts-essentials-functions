import { nonNullable } from '../nonNullable';

describe('nonNullable', () => {
  describe('happy path', () => {
    it('should return true for a number', () => {
      expect(nonNullable(42)).toBe(true);
    });

    it('should return true for zero', () => {
      expect(nonNullable(0)).toBe(true);
    });

    it('should return true for an empty string', () => {
      expect(nonNullable('')).toBe(true);
    });

    it('should return true for false', () => {
      expect(nonNullable(false)).toBe(true);
    });

    it('should return true for an empty object', () => {
      expect(nonNullable({})).toBe(true);
    });

    it('should return true for an empty array', () => {
      expect(nonNullable([])).toBe(true);
    });

    it('should return true for NaN', () => {
      expect(nonNullable(NaN)).toBe(true);
    });
  });

  describe('null and undefined', () => {
    it('should return false for null', () => {
      expect(nonNullable(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(nonNullable(undefined)).toBe(false);
    });
  });

  describe('type guard usage with Array.filter', () => {
    it('should filter out null and undefined from an array', () => {
      const items: (number | null | undefined)[] = [1, null, 2, undefined, 3];
      const filtered = items.filter(nonNullable);
      expect(filtered).toEqual([1, 2, 3]);
    });

    it('should filter out null and undefined from a string array', () => {
      const items: (string | null | undefined)[] = [
        'hello',
        null,
        'world',
        undefined,
      ];
      const filtered = items.filter(nonNullable);
      expect(filtered).toEqual(['hello', 'world']);
    });

    it('should return the full array when no null/undefined values exist', () => {
      const items = [1, 2, 3];
      const filtered = items.filter(nonNullable);
      expect(filtered).toEqual([1, 2, 3]);
    });

    it('should return an empty array when all values are null/undefined', () => {
      const items: (null | undefined)[] = [null, undefined, null];
      const filtered = items.filter(nonNullable);
      expect(filtered).toEqual([]);
    });

    it('should keep falsy values that are not null/undefined', () => {
      const items: (number | string | boolean | null | undefined)[] = [
        0,
        '',
        false,
        null,
        undefined,
      ];
      const filtered = items.filter(nonNullable);
      expect(filtered).toEqual([0, '', false]);
    });
  });
});
