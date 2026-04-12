import { invertObject } from '../invertObject';

describe('invertObject', () => {
  describe('happy path', () => {
    it('should invert string values', () => {
      expect(invertObject({ a: '1', b: '2' })).toEqual({ '1': 'a', '2': 'b' });
    });

    it('should invert number values', () => {
      expect(invertObject({ a: 1, b: 2 })).toEqual({ '1': 'a', '2': 'b' });
    });

    it('should handle real-world example', () => {
      expect(invertObject({ name: 'Alice', role: 'admin' })).toEqual({
        Alice: 'name',
        admin: 'role',
      });
    });
  });

  describe('edge cases', () => {
    it('should return empty object for empty input', () => {
      expect(invertObject({})).toEqual({});
    });

    it('should keep last key when values are duplicated', () => {
      const result = invertObject({ a: 'x', b: 'x' });
      expect(result['x']).toBe('b');
    });

    it('should handle single entry', () => {
      expect(invertObject({ key: 'value' })).toEqual({ value: 'key' });
    });
  });

  describe('immutability', () => {
    it('should not mutate the original object', () => {
      const original = { a: '1', b: '2' };
      const copy = { ...original };
      invertObject(original);
      expect(original).toEqual(copy);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not an object', () => {
      expect(() =>
        invertObject('not' as unknown as Record<string, string>),
      ).toThrow(TypeError);
      expect(() =>
        invertObject('not' as unknown as Record<string, string>),
      ).toThrow('Argument must be a plain object');
    });

    it('should throw TypeError for null', () => {
      expect(() =>
        invertObject(null as unknown as Record<string, string>),
      ).toThrow(TypeError);
    });

    it('should throw TypeError for array', () => {
      expect(() =>
        invertObject([] as unknown as Record<string, string>),
      ).toThrow(TypeError);
    });
  });
});
