import { timeZoneTransformer } from '../timeZoneTransformer';

describe('timeZoneTransformer', () => {
  describe('happy path', () => {
    it('should return an object with toUtc and fromUtc properties', () => {
      const result = timeZoneTransformer('2025-06-15T12:00:00');

      expect(result).toHaveProperty('toUtc');
      expect(result).toHaveProperty('fromUtc');
      expect(result.toUtc).toBeInstanceOf(Date);
      expect(result.fromUtc).toBeInstanceOf(Date);
    });

    it('should create a valid UTC date from the input string', () => {
      const result = timeZoneTransformer('2025-06-15T12:00:00');

      expect(result.toUtc.getUTCFullYear()).toBe(2025);
      expect(result.toUtc.getUTCMonth()).toBe(5);
      expect(result.toUtc.getUTCDate()).toBe(15);
      expect(result.toUtc.getUTCHours()).toBe(12);
      expect(result.toUtc.getUTCMinutes()).toBe(0);
      expect(result.toUtc.getUTCSeconds()).toBe(0);
    });

    it('should use Europe/Paris as the default timezone', () => {
      const result1 = timeZoneTransformer('2025-06-15T12:00:00');
      const result2 = timeZoneTransformer(
        '2025-06-15T12:00:00',
        'Europe/Paris',
      );

      expect(result1.toUtc.getTime()).toBe(result2.toUtc.getTime());
    });

    it('should accept different timezone identifiers', () => {
      const result = timeZoneTransformer(
        '2025-06-15T12:00:00',
        'America/New_York',
      );

      expect(result.toUtc).toBeInstanceOf(Date);
      expect(result.fromUtc).toBeInstanceOf(Date);
    });
  });

  describe('toUtc conversion', () => {
    it('should convert a date string to UTC treating values as local date components', () => {
      const result = timeZoneTransformer('2025-01-15T10:30:00');

      expect(result.toUtc.getUTCHours()).toBe(10);
      expect(result.toUtc.getUTCMinutes()).toBe(30);
    });

    it('should handle midnight correctly in toUtc', () => {
      const result = timeZoneTransformer('2025-06-15T00:00:00');

      expect(result.toUtc.getUTCHours()).toBe(0);
      expect(result.toUtc.getUTCMinutes()).toBe(0);
      expect(result.toUtc.getUTCSeconds()).toBe(0);
    });
  });

  describe('fromUtc conversion', () => {
    it('should return a valid Date for fromUtc', () => {
      const result = timeZoneTransformer(
        '2025-06-15T12:00:00',
        'America/New_York',
      );

      expect(result.fromUtc).toBeInstanceOf(Date);
      expect(isNaN(result.fromUtc.getTime())).toBe(false);
    });
  });

  describe('different timezones', () => {
    it('should work with Asia/Tokyo timezone', () => {
      const result = timeZoneTransformer('2025-06-15T12:00:00', 'Asia/Tokyo');

      expect(result.toUtc).toBeInstanceOf(Date);
      expect(result.fromUtc).toBeInstanceOf(Date);
    });

    it('should work with UTC timezone', () => {
      const result = timeZoneTransformer('2025-06-15T12:00:00', 'UTC');

      expect(result.toUtc).toBeInstanceOf(Date);
      expect(result.fromUtc).toBeInstanceOf(Date);
    });

    it('should work with Australia/Sydney timezone', () => {
      const result = timeZoneTransformer(
        '2025-06-15T12:00:00',
        'Australia/Sydney',
      );

      expect(result.toUtc).toBeInstanceOf(Date);
      expect(result.fromUtc).toBeInstanceOf(Date);
    });
  });

  describe('edge cases', () => {
    it('should handle date-only strings', () => {
      const result = timeZoneTransformer('2025-06-15');

      expect(result.toUtc).toBeInstanceOf(Date);
      expect(isNaN(result.toUtc.getTime())).toBe(false);
    });

    it('should handle year boundary dates', () => {
      const result = timeZoneTransformer('2025-01-01T00:00:00');

      expect(result.toUtc.getUTCFullYear()).toBe(2025);
      expect(result.toUtc.getUTCMonth()).toBe(0);
      expect(result.toUtc.getUTCDate()).toBe(1);
    });

    it('should handle end-of-year dates', () => {
      const result = timeZoneTransformer('2025-12-31T23:59:59');

      expect(result.toUtc.getUTCFullYear()).toBe(2025);
      expect(result.toUtc.getUTCMonth()).toBe(11);
      expect(result.toUtc.getUTCDate()).toBe(31);
    });
  });
});
