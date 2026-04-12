import { sample } from '../sample';

describe('sample', () => {
  describe('happy path', () => {
    it('should return an element from the array', () => {
      const arr = [1, 2, 3, 4, 5];
      for (let i = 0; i < 50; i++) {
        expect(arr).toContain(sample(arr));
      }
    });

    it('should return the only element from single-element array', () => {
      expect(sample([42])).toBe(42);
    });

    it('should work with string arrays', () => {
      const arr = ['a', 'b', 'c'];
      expect(arr).toContain(sample(arr));
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [1, 2, 3];
      const copy = [...original];
      sample(original);
      expect(original).toEqual(copy);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not an array', () => {
      expect(() => sample('not' as unknown as unknown[])).toThrow(TypeError);
      expect(() => sample('not' as unknown as unknown[])).toThrow(
        'Argument must be an array',
      );
    });

    it('should throw RangeError for empty array', () => {
      expect(() => sample([])).toThrow(RangeError);
      expect(() => sample([])).toThrow('Array must not be empty');
    });
  });
});
