import { truncate } from '../truncate';

describe('truncate', () => {
  describe('happy path', () => {
    it('should truncate with default suffix', () => {
      expect(truncate('Hello, World!', 8)).toBe('Hello...');
    });

    it('should truncate with custom suffix', () => {
      expect(truncate('Hello, World!', 10, '…')).toBe('Hello, Wo…');
    });

    it('should return original string when shorter than maxLength', () => {
      expect(truncate('Hi', 10)).toBe('Hi');
    });

    it('should return original string when equal to maxLength', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(truncate('', 5)).toBe('');
    });

    it('should handle maxLength of 0', () => {
      expect(truncate('Hello', 0)).toBe('');
    });

    it('should handle maxLength shorter than suffix', () => {
      expect(truncate('Hello World', 2)).toBe('..');
    });

    it('should handle maxLength equal to suffix length', () => {
      expect(truncate('Hello World', 3)).toBe('...');
    });

    it('should handle empty suffix', () => {
      expect(truncate('Hello, World!', 5, '')).toBe('Hello');
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not a string', () => {
      expect(() => truncate(123 as unknown as string, 5)).toThrow(TypeError);
      expect(() => truncate(123 as unknown as string, 5)).toThrow(
        'First argument must be a string',
      );
    });

    it('should throw RangeError when maxLength is negative', () => {
      expect(() => truncate('hello', -1)).toThrow(RangeError);
      expect(() => truncate('hello', -1)).toThrow(
        'maxLength must be a non-negative integer',
      );
    });

    it('should throw RangeError when maxLength is a float', () => {
      expect(() => truncate('hello', 2.5)).toThrow(RangeError);
    });

    it('should throw TypeError when suffix is not a string', () => {
      expect(() => truncate('hello', 5, 123 as unknown as string)).toThrow(
        TypeError,
      );
    });
  });
});
