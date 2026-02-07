import { recursiveReplaceKey } from '../recursiveReplaceKey';

describe('recursiveReplaceKey', () => {
  describe('happy path', () => {
    it('should replace string values containing the detected word', () => {
      const obj = { url: 'http://old.example.com' };
      const result = recursiveReplaceKey(
        obj,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(result).toEqual({ url: 'https://new.example.com' });
    });

    it('should not replace strings that do not contain the detected word', () => {
      const obj = { url: 'http://current.example.com', name: 'test' };
      const result = recursiveReplaceKey(
        obj,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(result).toEqual({
        url: 'http://current.example.com',
        name: 'test',
      });
    });

    it('should replace values in multiple keys', () => {
      const obj = {
        primary: 'http://old.example.com/api',
        secondary: 'http://old.example.com/auth',
      };
      const result = recursiveReplaceKey(
        obj,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(result).toEqual({
        primary: 'https://new.example.com',
        secondary: 'https://new.example.com',
      });
    });
  });

  describe('nested objects', () => {
    it('should recursively replace in nested objects', () => {
      const obj = {
        config: {
          api: {
            url: 'http://old.example.com/api',
          },
        },
      };
      const result = recursiveReplaceKey(
        obj,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(result).toEqual({
        config: { api: { url: 'https://new.example.com' } },
      });
    });

    it('should handle mixed nested structures', () => {
      const obj = {
        url: 'http://old.example.com',
        nested: {
          link: 'http://old.example.com/page',
          count: 5,
          active: true,
        },
      };
      const result = recursiveReplaceKey(
        obj,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(result.url).toBe('https://new.example.com');
      expect(result.nested.link).toBe('https://new.example.com');
      expect(result.nested.count).toBe(5);
      expect(result.nested.active).toBe(true);
    });
  });

  describe('arrays', () => {
    it('should handle arrays in objects', () => {
      const obj = {
        urls: ['http://old.example.com/1', 'http://old.example.com/2'],
      };
      const result = recursiveReplaceKey(
        obj,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(result.urls).toEqual([
        'https://new.example.com',
        'https://new.example.com',
      ]);
    });

    it('should handle arrays of objects', () => {
      const obj = {
        items: [
          { url: 'http://old.example.com/a' },
          { url: 'http://other.com/b' },
        ],
      };
      const result = recursiveReplaceKey(
        obj,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(result.items[0].url).toBe('https://new.example.com');
      expect(result.items[1].url).toBe('http://other.com/b');
    });
  });

  describe('multiple replacement mappings', () => {
    it('should apply the first matching replacement', () => {
      const obj = { url: 'http://old.example.com/path' };
      const result = recursiveReplaceKey(
        obj,
        {
          'http://old.example.com': 'https://new.example.com',
          'http://old.example.com/path': 'https://new.example.com/newpath',
        },
        'old',
      );
      // The first matching key in the mapping triggers and breaks
      expect(result.url).toBe('https://new.example.com');
    });
  });

  describe('edge cases', () => {
    it('should return same structure for empty object', () => {
      const result = recursiveReplaceKey({}, { old: 'new' }, 'old');
      expect(result).toEqual({});
    });

    it('should handle non-string values without modification', () => {
      const obj = { a: 1, b: true, c: null, d: undefined };
      const result = recursiveReplaceKey(
        obj as Record<string, any>,
        { old: 'new' },
        'old',
      );
      expect(result).toEqual({ a: 1, b: true, c: null, d: undefined });
    });

    it('should return primitives/null as-is', () => {
      expect(
        recursiveReplaceKey(
          null as unknown as Record<string, any>,
          { old: 'new' },
          'old',
        ),
      ).toBeNull();

      expect(
        recursiveReplaceKey(
          undefined as unknown as Record<string, any>,
          { old: 'new' },
          'old',
        ),
      ).toBeUndefined();
    });

    it('should handle word detection at different positions in string', () => {
      const obj = { a: 'prefix_old_suffix' };
      const result = recursiveReplaceKey(
        obj,
        { prefix_old_suffix: 'replaced' },
        'old',
      );
      expect(result).toEqual({ a: 'replaced' });
    });

    it('should not replace when word is not detected even if mapping key exists', () => {
      const obj = { a: 'no match here' };
      const result = recursiveReplaceKey(
        obj,
        { 'no match here': 'replaced' },
        'old',
      );
      expect(result).toEqual({ a: 'no match here' });
    });
  });

  describe('circular references', () => {
    it('should handle circular references without infinite loop', () => {
      const obj: Record<string, any> = { url: 'http://old.example.com' };
      obj.self = obj;
      const result = recursiveReplaceKey(
        obj,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(result.url).toBe('https://new.example.com');
      // Circular ref returns original visited object
      expect(result.self).toBe(obj);
    });

    it('should handle mutual circular references', () => {
      const a: Record<string, any> = { url: 'http://old.example.com/a' };
      const b: Record<string, any> = { url: 'http://old.example.com/b' };
      a.ref = b;
      b.ref = a;
      const result = recursiveReplaceKey(
        a,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(result.url).toBe('https://new.example.com');
      expect(result.ref.url).toBe('https://new.example.com');
    });
  });

  describe('immutability', () => {
    it('should not mutate the original object', () => {
      const original = {
        url: 'http://old.example.com',
        nested: { link: 'http://old.example.com/page' },
      };
      recursiveReplaceKey(
        original,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(original.url).toBe('http://old.example.com');
      expect(original.nested.link).toBe('http://old.example.com/page');
    });

    it('should return a new object reference', () => {
      const original = { url: 'http://old.example.com' };
      const result = recursiveReplaceKey(
        original,
        { 'http://old.example.com': 'https://new.example.com' },
        'old',
      );
      expect(result).not.toBe(original);
    });
  });
});
