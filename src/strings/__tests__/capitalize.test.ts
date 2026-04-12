import { capitalize } from '../capitalize';

describe('capitalize', () => {
  describe('happy path', () => {
    it('should capitalize the first letter and lowercase the rest', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle all uppercase input', () => {
      expect(capitalize('HELLO')).toBe('Hello');
    });

    it('should handle mixed case input', () => {
      expect(capitalize('hELLO WORLD')).toBe('Hello world');
    });

    it('should handle a single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should handle already capitalized input', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle strings starting with numbers', () => {
      expect(capitalize('123abc')).toBe('123abc');
    });

    it('should handle strings with special characters', () => {
      expect(capitalize('!hello')).toBe('!hello');
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not a string', () => {
      expect(() => capitalize(123 as unknown as string)).toThrow(TypeError);
      expect(() => capitalize(123 as unknown as string)).toThrow(
        'Argument must be a string',
      );
    });

    it('should throw TypeError for null input', () => {
      expect(() => capitalize(null as unknown as string)).toThrow(TypeError);
    });

    it('should throw TypeError for undefined input', () => {
      expect(() => capitalize(undefined as unknown as string)).toThrow(
        TypeError,
      );
    });
  });
});
