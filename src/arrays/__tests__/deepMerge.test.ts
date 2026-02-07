import { deepMergeArray } from '../deepMerge';

describe('deepMergeArray', () => {
  describe('happy path', () => {
    it('should merge two arrays of objects by a shared key', () => {
      const users = [{ id: 1, name: 'Alice' }];
      const extra = [{ id: 1, age: 30 }];
      const result = deepMergeArray(users, extra, 'id');
      expect(result).toEqual([{ id: 1, name: 'Alice', age: 30 }]);
    });

    it('should merge multiple matching objects', () => {
      const array1 = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      const array2 = [
        { id: 1, score: 100 },
        { id: 2, score: 200 },
      ];
      const result = deepMergeArray(array1, array2, 'id');
      expect(result).toEqual([
        { id: 1, name: 'Alice', score: 100 },
        { id: 2, name: 'Bob', score: 200 },
      ]);
    });

    it('should return unmodified items when no match is found in array2', () => {
      const array1 = [{ id: 1, name: 'Alice' }];
      const array2 = [{ id: 2, age: 30 }];
      const result = deepMergeArray(array1, array2, 'id');
      expect(result).toEqual([{ id: 1, name: 'Alice' }]);
    });

    it('should use array2 properties by default (left merge) when keys conflict', () => {
      const array1 = [{ id: 1, name: 'Alice' }];
      const array2 = [{ id: 1, name: 'Bob' }];
      const result = deepMergeArray(array1, array2, 'id');
      expect(result).toEqual([{ id: 1, name: 'Bob' }]);
    });

    it('should use array1 properties when isRightMerge is true and keys conflict', () => {
      const array1 = [{ id: 1, name: 'Alice' }];
      const array2 = [{ id: 1, name: 'Bob' }];
      const result = deepMergeArray(array1, array2, 'id', true);
      expect(result).toEqual([{ id: 1, name: 'Alice' }]);
    });
  });

  describe('edge cases', () => {
    it('should return an empty array when both arrays are empty', () => {
      expect(deepMergeArray([], [], 'id')).toEqual([]);
    });

    it('should return copies of items when array2 is empty', () => {
      const array1 = [{ id: 1, name: 'Alice' }];
      const result = deepMergeArray(array1, [], 'id');
      expect(result).toEqual([{ id: 1, name: 'Alice' }]);
    });

    it('should return an empty array when array1 is empty', () => {
      const array2 = [{ id: 1, name: 'Alice' }];
      const result = deepMergeArray([], array2, 'id');
      expect(result).toEqual([]);
    });

    it('should handle string keys for matching', () => {
      const array1 = [{ code: 'A', value: 1 }];
      const array2 = [{ code: 'A', extra: 'x' }];
      const result = deepMergeArray(array1, array2, 'code');
      expect(result).toEqual([{ code: 'A', value: 1, extra: 'x' }]);
    });

    it('should handle a single-element merge', () => {
      const array1 = [{ id: 1 }];
      const array2 = [{ id: 1, data: 'test' }];
      const result = deepMergeArray(array1, array2, 'id');
      expect(result).toEqual([{ id: 1, data: 'test' }]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original arrays', () => {
      const array1 = [{ id: 1, name: 'Alice' }];
      const array2 = [{ id: 1, age: 30 }];
      const copy1 = JSON.parse(JSON.stringify(array1));
      const copy2 = JSON.parse(JSON.stringify(array2));
      deepMergeArray(array1, array2, 'id');
      expect(array1).toEqual(copy1);
      expect(array2).toEqual(copy2);
    });

    it('should return new object references', () => {
      const array1 = [{ id: 1, name: 'Alice' }];
      const array2 = [{ id: 1, age: 30 }];
      const result = deepMergeArray(array1, array2, 'id');
      expect(result[0]).not.toBe(array1[0]);
    });

    it('should return new object references even for non-matched items', () => {
      const array1 = [{ id: 1, name: 'Alice' }];
      const result = deepMergeArray(array1, [], 'id');
      expect(result[0]).not.toBe(array1[0]);
    });
  });
});
