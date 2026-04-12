import { startOfDay } from '../startOfDay';

describe('startOfDay', () => {
  describe('happy path', () => {
    it('should set time to 00:00:00.000', () => {
      const result = startOfDay(new Date('2025-01-15T14:30:45.123'));
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
      expect(result.getMilliseconds()).toBe(0);
    });

    it('should preserve the date', () => {
      const result = startOfDay(new Date('2025-06-20T18:00:00'));
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(5); // June = 5
      expect(result.getDate()).toBe(20);
    });
  });

  describe('edge cases', () => {
    it('should handle date already at start of day', () => {
      const date = new Date('2025-01-15T00:00:00.000');
      const result = startOfDay(date);
      expect(result.getTime()).toBe(date.getTime());
    });

    it('should handle end of day', () => {
      const result = startOfDay(new Date('2025-01-15T23:59:59.999'));
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
    });
  });

  describe('immutability', () => {
    it('should not mutate the original date', () => {
      const original = new Date('2025-01-15T14:30:00');
      const originalTime = original.getTime();
      startOfDay(original);
      expect(original.getTime()).toBe(originalTime);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not a valid Date', () => {
      expect(() => startOfDay('not a date' as unknown as Date)).toThrow(
        TypeError,
      );
      expect(() => startOfDay('not a date' as unknown as Date)).toThrow(
        'First argument must be a valid Date',
      );
    });

    it('should throw TypeError for invalid Date objects', () => {
      expect(() => startOfDay(new Date('invalid'))).toThrow(TypeError);
    });
  });
});
