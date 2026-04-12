import { reverse } from '../reverse';

describe('reverse', () => {
  describe('happy path', () => {
    it('should reverse a string', () => {
      expect(reverse('hello')).toBe('olleh');
    });

    it('should reverse a palindrome to itself', () => {
      expect(reverse('racecar')).toBe('racecar');
    });

    it('should handle spaces', () => {
      expect(reverse('a b c')).toBe('c b a');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(reverse('')).toBe('');
    });

    it('should handle single character', () => {
      expect(reverse('a')).toBe('a');
    });

    it('should handle unicode characters', () => {
      expect(reverse('abc')).toBe('cba');
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not a string', () => {
      expect(() => reverse(123 as unknown as string)).toThrow(TypeError);
      expect(() => reverse(123 as unknown as string)).toThrow(
        'Argument must be a string',
      );
    });
  });
});
