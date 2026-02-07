import { cleanArray } from '../clean';

describe('cleanArray', () => {
  describe('happy path', () => {
    it('should remove null and undefined values', () => {
      expect(cleanArray([1, null, 2, undefined, 3])).toEqual([1, 2, 3]);
    });

    it('should remove all falsy values', () => {
      expect(cleanArray([0, 1, '', 'hello', null, undefined, false, true])).toEqual([
        1,
        'hello',
        true,
      ]);
    });

    it('should keep truthy values intact', () => {
      expect(cleanArray([1, 'a', true, {}, []])).toEqual([1, 'a', true, {}, []]);
    });

    it('should remove NaN', () => {
      const result = cleanArray([1, NaN, 2]);
      expect(result).toEqual([1, 2]);
    });
  });

  describe('edge cases', () => {
    it('should return an empty array when given an empty array', () => {
      expect(cleanArray([])).toEqual([]);
    });

    it('should return an empty array when all values are falsy', () => {
      expect(cleanArray([null, undefined, 0, '', false])).toEqual([]);
    });

    it('should return the same elements when all values are truthy', () => {
      expect(cleanArray([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should handle a single-element array with a truthy value', () => {
      expect(cleanArray([42])).toEqual([42]);
    });

    it('should handle a single-element array with a falsy value', () => {
      expect(cleanArray([null])).toEqual([]);
    });

    it('should keep -1 and negative numbers (truthy)', () => {
      expect(cleanArray([-1, -0, 0, 1])).toEqual([-1, 1]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [1, null, 2, undefined, 3];
      const copy = [...original];
      cleanArray(original);
      expect(original).toEqual(copy);
    });
  });
});
