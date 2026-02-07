import { getRepeatedOccurrenceArray } from '../getRepeatedOccurence';

describe('getRepeatedOccurrenceArray', () => {
  describe('happy path', () => {
    it('should count occurrences of each unique number', () => {
      const [elements, counts] = getRepeatedOccurrenceArray([1, 2, 2, 3, 3, 3]);
      expect(elements).toEqual([1, 2, 3]);
      expect(counts).toEqual([1, 2, 3]);
    });

    it('should handle all unique elements', () => {
      const [elements, counts] = getRepeatedOccurrenceArray([3, 1, 2]);
      expect(elements).toEqual([1, 2, 3]);
      expect(counts).toEqual([1, 1, 1]);
    });

    it('should handle all identical elements', () => {
      const [elements, counts] = getRepeatedOccurrenceArray([5, 5, 5]);
      expect(elements).toEqual([5]);
      expect(counts).toEqual([3]);
    });

    it('should handle string arrays', () => {
      const [elements, counts] = getRepeatedOccurrenceArray([
        'apple',
        'banana',
        'apple',
        'cherry',
        'banana',
        'apple',
      ]);
      expect(elements).toEqual(['apple', 'banana', 'cherry']);
      expect(counts).toEqual([3, 2, 1]);
    });
  });

  describe('edge cases', () => {
    it('should return empty arrays for an empty input', () => {
      const [elements, counts] = getRepeatedOccurrenceArray([]);
      expect(elements).toEqual([]);
      expect(counts).toEqual([]);
    });

    it('should handle a single-element array', () => {
      const [elements, counts] = getRepeatedOccurrenceArray([42]);
      expect(elements).toEqual([42]);
      expect(counts).toEqual([1]);
    });

    it('should handle two identical elements', () => {
      const [elements, counts] = getRepeatedOccurrenceArray([7, 7]);
      expect(elements).toEqual([7]);
      expect(counts).toEqual([2]);
    });

    it('should handle two different elements', () => {
      const [elements, counts] = getRepeatedOccurrenceArray([1, 2]);
      expect(elements).toEqual([1, 2]);
      expect(counts).toEqual([1, 1]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [3, 1, 2, 1, 3];
      const copy = [...original];
      getRepeatedOccurrenceArray(original);
      expect(original).toEqual(copy);
    });
  });

  describe('return structure', () => {
    it('should return a tuple of two arrays with equal length', () => {
      const result = getRepeatedOccurrenceArray([1, 2, 2, 3]);
      expect(result).toHaveLength(2);
      expect(result[0].length).toBe(result[1].length);
    });

    it('should have counts that sum to the original array length', () => {
      const input = [1, 2, 2, 3, 3, 3, 4];
      const [, counts] = getRepeatedOccurrenceArray(input);
      const total = counts.reduce((sum, c) => sum + c, 0);
      expect(total).toBe(input.length);
    });
  });
});
