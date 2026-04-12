import { endOfDay } from '../endOfDay';

describe('endOfDay', () => {
  describe('happy path', () => {
    it('should set time to 23:59:59.999', () => {
      const result = endOfDay(new Date('2025-01-15T14:30:45.123'));
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
      expect(result.getSeconds()).toBe(59);
      expect(result.getMilliseconds()).toBe(999);
    });

    it('should preserve the date', () => {
      const result = endOfDay(new Date('2025-06-20T10:00:00'));
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(5); // June = 5
      expect(result.getDate()).toBe(20);
    });
  });

  describe('edge cases', () => {
    it('should handle date already at end of day', () => {
      const date = new Date('2025-01-15T23:59:59.999');
      const result = endOfDay(date);
      expect(result.getTime()).toBe(date.getTime());
    });

    it('should handle start of day', () => {
      const result = endOfDay(new Date('2025-01-15T00:00:00.000'));
      expect(result.getHours()).toBe(23);
      expect(result.getMinutes()).toBe(59);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original date', () => {
      const original = new Date('2025-01-15T14:30:00');
      const originalTime = original.getTime();
      endOfDay(original);
      expect(original.getTime()).toBe(originalTime);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not a valid Date', () => {
      expect(() => endOfDay('not a date' as unknown as Date)).toThrow(
        TypeError,
      );
      expect(() => endOfDay('not a date' as unknown as Date)).toThrow(
        'First argument must be a valid Date',
      );
    });

    it('should throw TypeError for invalid Date objects', () => {
      expect(() => endOfDay(new Date('invalid'))).toThrow(TypeError);
    });
  });
});
