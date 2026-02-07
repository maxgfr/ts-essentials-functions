import { removeDuplicateObjectInArray } from '../removeDuplicateObject';

describe('removeDuplicateObjectInArray', () => {
  describe('happy path', () => {
    it('should remove duplicate objects by id key', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 1, name: 'Alice Clone' },
      ];
      const result = removeDuplicateObjectInArray(users, 'id');
      expect(result).toEqual([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]);
    });

    it('should keep the first occurrence when duplicates exist', () => {
      const items = [
        { code: 'A', value: 1 },
        { code: 'A', value: 2 },
        { code: 'A', value: 3 },
      ];
      const result = removeDuplicateObjectInArray(items, 'code');
      expect(result).toEqual([{ code: 'A', value: 1 }]);
    });

    it('should return all items when there are no duplicates', () => {
      const items = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ];
      const result = removeDuplicateObjectInArray(items, 'id');
      expect(result).toEqual(items);
    });

    it('should deduplicate by a string key', () => {
      const items = [
        { email: 'a@test.com', name: 'Alice' },
        { email: 'b@test.com', name: 'Bob' },
        { email: 'a@test.com', name: 'Alice 2' },
      ];
      const result = removeDuplicateObjectInArray(items, 'email');
      expect(result).toEqual([
        { email: 'a@test.com', name: 'Alice' },
        { email: 'b@test.com', name: 'Bob' },
      ]);
    });
  });

  describe('edge cases', () => {
    it('should return an empty array for an empty input', () => {
      expect(removeDuplicateObjectInArray([], 'id')).toEqual([]);
    });

    it('should handle a single-element array', () => {
      const items = [{ id: 1, name: 'Alice' }];
      expect(removeDuplicateObjectInArray(items, 'id')).toEqual([
        { id: 1, name: 'Alice' },
      ]);
    });

    it('should handle duplicate keys with undefined values', () => {
      const items = [
        { id: undefined, name: 'A' },
        { id: undefined, name: 'B' },
      ];
      const result = removeDuplicateObjectInArray(items, 'id');
      expect(result).toEqual([{ id: undefined, name: 'A' }]);
    });

    it('should handle duplicate keys with null values', () => {
      const items = [
        { id: null, name: 'A' },
        { id: null, name: 'B' },
      ];
      const result = removeDuplicateObjectInArray(items, 'id');
      expect(result).toEqual([{ id: null, name: 'A' }]);
    });

    it('should handle numeric key values including 0', () => {
      const items = [
        { id: 0, name: 'Zero' },
        { id: 0, name: 'Zero Again' },
        { id: 1, name: 'One' },
      ];
      const result = removeDuplicateObjectInArray(items, 'id');
      expect(result).toEqual([
        { id: 0, name: 'Zero' },
        { id: 1, name: 'One' },
      ]);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original array', () => {
      const original = [
        { id: 1, name: 'Alice' },
        { id: 1, name: 'Alice Clone' },
      ];
      const copy = JSON.parse(JSON.stringify(original));
      removeDuplicateObjectInArray(original, 'id');
      expect(original).toEqual(copy);
    });

    it('should return the same object references (filter-based)', () => {
      const item1 = { id: 1, name: 'Alice' };
      const item2 = { id: 2, name: 'Bob' };
      const item3 = { id: 1, name: 'Clone' };
      const result = removeDuplicateObjectInArray([item1, item2, item3], 'id');
      expect(result[0]).toBe(item1);
      expect(result[1]).toBe(item2);
    });
  });
});
