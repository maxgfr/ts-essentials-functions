import { range } from '../range';

describe('range', () => {
  describe('happy path', () => {
    it('should generate a range of numbers', () => {
      expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
    });

    it('should generate a range with custom step', () => {
      expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
    });

    it('should generate a descending range', () => {
      expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
    });

    it('should generate a descending range with default step', () => {
      expect(range(5, 0)).toEqual([5, 4, 3, 2, 1]);
    });

    it('should handle negative ranges', () => {
      expect(range(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2]);
    });
  });

  describe('edge cases', () => {
    it('should return empty array when start equals end', () => {
      expect(range(5, 5)).toEqual([]);
    });

    it('should handle fractional step', () => {
      expect(range(0, 1, 0.5)).toEqual([0, 0.5]);
    });

    it('should handle single element range', () => {
      expect(range(0, 1)).toEqual([0]);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for NaN start', () => {
      expect(() => range(NaN, 5)).toThrow(TypeError);
      expect(() => range(NaN, 5)).toThrow('start must be a valid number');
    });

    it('should throw TypeError for NaN end', () => {
      expect(() => range(0, NaN)).toThrow(TypeError);
      expect(() => range(0, NaN)).toThrow('end must be a valid number');
    });

    it('should throw RangeError when step is zero', () => {
      expect(() => range(0, 5, 0)).toThrow(RangeError);
      expect(() => range(0, 5, 0)).toThrow('step must not be zero');
    });

    it('should throw RangeError when step sign mismatches direction', () => {
      expect(() => range(0, 5, -1)).toThrow(RangeError);
      expect(() => range(5, 0, 1)).toThrow(RangeError);
    });
  });
});
