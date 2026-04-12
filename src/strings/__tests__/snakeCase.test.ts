import { snakeCase } from '../snakeCase';

describe('snakeCase', () => {
  describe('happy path', () => {
    it('should convert space-separated words', () => {
      expect(snakeCase('hello world')).toBe('hello_world');
    });

    it('should convert camelCase', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world');
    });

    it('should convert PascalCase', () => {
      expect(snakeCase('PascalCase')).toBe('pascal_case');
    });

    it('should convert kebab-case', () => {
      expect(snakeCase('foo-bar')).toBe('foo_bar');
    });

    it('should convert UPPER_CASE', () => {
      expect(snakeCase('FOO BAR')).toBe('foo_bar');
    });

    it('should handle multiple words', () => {
      expect(snakeCase('one two three')).toBe('one_two_three');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(snakeCase('')).toBe('');
    });

    it('should handle single word', () => {
      expect(snakeCase('hello')).toBe('hello');
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not a string', () => {
      expect(() => snakeCase(123 as unknown as string)).toThrow(TypeError);
      expect(() => snakeCase(123 as unknown as string)).toThrow(
        'Argument must be a string',
      );
    });
  });
});
