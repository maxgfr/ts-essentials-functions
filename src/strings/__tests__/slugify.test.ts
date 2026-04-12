import { slugify } from '../slugify';

describe('slugify', () => {
  describe('happy path', () => {
    it('should convert a simple string to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello World!')).toBe('hello-world');
    });

    it('should strip accents', () => {
      expect(slugify('Crème Brûlée')).toBe('creme-brulee');
    });

    it('should handle uppercase strings', () => {
      expect(slugify('FOO BAR BAZ')).toBe('foo-bar-baz');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(slugify('')).toBe('');
    });

    it('should collapse multiple spaces', () => {
      expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
    });

    it('should handle strings with only special characters', () => {
      expect(slugify('!@#$%')).toBe('');
    });

    it('should handle strings with numbers', () => {
      expect(slugify('Hello World 123')).toBe('hello-world-123');
    });

    it('should handle strings with mixed separators', () => {
      expect(slugify('foo_bar-baz qux')).toBe('foo-bar-baz-qux');
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not a string', () => {
      expect(() => slugify(123 as unknown as string)).toThrow(TypeError);
      expect(() => slugify(123 as unknown as string)).toThrow(
        'Argument must be a string',
      );
    });

    it('should throw TypeError for null input', () => {
      expect(() => slugify(null as unknown as string)).toThrow(TypeError);
    });
  });
});
