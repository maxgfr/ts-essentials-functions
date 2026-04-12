import { camelCase } from '../camelCase';

describe('camelCase', () => {
  describe('happy path', () => {
    it('should convert space-separated words', () => {
      expect(camelCase('hello world')).toBe('helloWorld');
    });

    it('should convert hyphen-separated words', () => {
      expect(camelCase('foo-bar')).toBe('fooBar');
    });

    it('should convert underscore-separated words', () => {
      expect(camelCase('foo_bar')).toBe('fooBar');
    });

    it('should convert UPPER_SNAKE_CASE', () => {
      expect(camelCase('FOO_BAR')).toBe('fooBar');
    });

    it('should convert PascalCase', () => {
      expect(camelCase('PascalCase')).toBe('pascalCase');
    });

    it('should convert kebab-case', () => {
      expect(camelCase('kebab-case-string')).toBe('kebabCaseString');
    });

    it('should handle multiple words', () => {
      expect(camelCase('one two three four')).toBe('oneTwoThreeFour');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(camelCase('')).toBe('');
    });

    it('should return empty string for whitespace-only input', () => {
      expect(camelCase('   ')).toBe('');
    });

    it('should handle single word', () => {
      expect(camelCase('hello')).toBe('hello');
    });

    it('should handle strings with numbers', () => {
      expect(camelCase('hello2world')).toBe('hello2World');
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not a string', () => {
      expect(() => camelCase(123 as unknown as string)).toThrow(TypeError);
      expect(() => camelCase(123 as unknown as string)).toThrow(
        'Argument must be a string',
      );
    });

    it('should throw TypeError for null input', () => {
      expect(() => camelCase(null as unknown as string)).toThrow(TypeError);
    });
  });
});
