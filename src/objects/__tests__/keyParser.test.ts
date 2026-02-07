import { objectKeyParser } from '../keyParser';

describe('objectKeyParser', () => {
  describe('happy path', () => {
    it('should transform value for matching key', () => {
      const obj = { name: 'hello' };
      const result = objectKeyParser('name', obj, (v) => v.toUpperCase());
      expect(result).toEqual({ name: 'HELLO' });
    });

    it('should not transform values for non-matching keys', () => {
      const obj = { name: 'hello', age: '30' };
      const result = objectKeyParser('name', obj, (v) => v.toUpperCase());
      expect(result).toEqual({ name: 'HELLO', age: '30' });
    });

    it('should handle multiple matching keys at different levels', () => {
      const obj = {
        name: 'hello',
        nested: { name: 'world' },
      };
      const result = objectKeyParser('name', obj, (v) => v.toUpperCase());
      expect(result).toEqual({
        name: 'HELLO',
        nested: { name: 'WORLD' },
      });
    });
  });

  describe('nested objects', () => {
    it('should recursively transform deeply nested matching keys', () => {
      const obj = {
        level1: {
          level2: {
            level3: {
              target: 'value',
            },
          },
        },
      };
      const result = objectKeyParser('target', obj, (v) => `modified_${v}`);
      expect(result).toEqual({
        level1: { level2: { level3: { target: 'modified_value' } } },
      });
    });

    it('should handle objects with mixed value types', () => {
      const obj = {
        name: 'test',
        count: 5,
        active: true,
        nested: { name: 'inner' },
      };
      const result = objectKeyParser('name', obj, (v) => v.toUpperCase());
      expect(result).toEqual({
        name: 'TEST',
        count: 5,
        active: true,
        nested: { name: 'INNER' },
      });
    });

    it('should handle arrays as object values (arrays are objects)', () => {
      const obj = {
        items: [{ name: 'a' }, { name: 'b' }],
      };
      const result = objectKeyParser('name', obj, (v) => v.toUpperCase());
      expect(result.items).toBeDefined();
      // Array is treated as object, so indexed keys get parsed
      expect((result.items as Record<string, any>)['0']).toEqual({ name: 'A' });
      expect((result.items as Record<string, any>)['1']).toEqual({ name: 'B' });
    });
  });

  describe('transformation functions', () => {
    it('should apply reverse transformation', () => {
      const obj = { text: 'hello' };
      const result = objectKeyParser('text', obj, (v) =>
        v.split('').reverse().join(''),
      );
      expect(result).toEqual({ text: 'olleh' });
    });

    it('should apply prefix transformation', () => {
      const obj = { url: '/path' };
      const result = objectKeyParser(
        'url',
        obj,
        (v) => `https://example.com${v}`,
      );
      expect(result).toEqual({ url: 'https://example.com/path' });
    });

    it('should apply replace transformation', () => {
      const obj = { content: 'hello world' };
      const result = objectKeyParser('content', obj, (v) =>
        v.replace('world', 'universe'),
      );
      expect(result).toEqual({ content: 'hello universe' });
    });
  });

  describe('edge cases', () => {
    it('should return empty object for empty input', () => {
      const result = objectKeyParser('key', {}, (v) => v);
      expect(result).toEqual({});
    });

    it('should handle key not present in object', () => {
      const obj = { a: 1, b: 2 };
      const result = objectKeyParser('missing', obj, (v) => v.toUpperCase());
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should handle empty string values', () => {
      const obj = { name: '' };
      const result = objectKeyParser('name', obj, (v) => v || 'default');
      expect(result).toEqual({ name: 'default' });
    });
  });

  describe('circular references', () => {
    it('should handle circular references without infinite loop', () => {
      const obj: Record<string, any> = { name: 'test' };
      obj.self = obj;
      const result = objectKeyParser('name', obj, (v) => v.toUpperCase());
      expect(result.name).toBe('TEST');
      // The self-reference returns the original (already-visited) object
      expect(result.self).toBe(obj);
    });

    it('should handle mutual circular references', () => {
      const a: Record<string, any> = { name: 'a' };
      const b: Record<string, any> = { name: 'b' };
      a.ref = b;
      b.ref = a;
      const result = objectKeyParser('name', a, (v) => v.toUpperCase());
      expect(result.name).toBe('A');
      expect(result.ref.name).toBe('B');
    });
  });

  describe('immutability', () => {
    it('should not mutate the original object', () => {
      const original = { name: 'hello', nested: { name: 'world' } };
      objectKeyParser('name', original, (v) => v.toUpperCase());
      expect(original.name).toBe('hello');
      expect(original.nested.name).toBe('world');
    });

    it('should return a new object reference', () => {
      const original = { name: 'hello' };
      const result = objectKeyParser('name', original, (v) => v.toUpperCase());
      expect(result).not.toBe(original);
    });

    it('should return new nested object references', () => {
      const nested = { name: 'inner' };
      const original = { outer: nested };
      const result = objectKeyParser('name', original, (v) => v.toUpperCase());
      expect(result.outer).not.toBe(nested);
    });
  });
});
