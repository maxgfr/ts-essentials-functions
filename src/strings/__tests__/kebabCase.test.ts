import { kebabCase } from '../kebabCase';

describe('kebabCase', () => {
  describe('happy path', () => {
    it('should convert space-separated words', () => {
      expect(kebabCase('hello world')).toBe('hello-world');
    });

    it('should convert camelCase', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world');
    });

    it('should convert PascalCase', () => {
      expect(kebabCase('PascalCase')).toBe('pascal-case');
    });

    it('should convert UPPER_SNAKE_CASE', () => {
      expect(kebabCase('FOO_BAR')).toBe('foo-bar');
    });

    it('should handle multiple words', () => {
      expect(kebabCase('one two three')).toBe('one-two-three');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(kebabCase('')).toBe('');
    });

    it('should handle single word', () => {
      expect(kebabCase('hello')).toBe('hello');
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not a string', () => {
      expect(() => kebabCase(123 as unknown as string)).toThrow(TypeError);
      expect(() => kebabCase(123 as unknown as string)).toThrow(
        'Argument must be a string',
      );
    });
  });
});
