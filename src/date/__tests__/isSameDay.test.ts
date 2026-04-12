import { isSameDay } from '../isSameDay';

describe('isSameDay', () => {
  describe('happy path', () => {
    it('should return true for same day different times', () => {
      expect(
        isSameDay(
          new Date('2025-01-15T10:00:00'),
          new Date('2025-01-15T22:00:00'),
        ),
      ).toBe(true);
    });

    it('should return false for different days', () => {
      expect(isSameDay(new Date('2025-01-15'), new Date('2025-01-16'))).toBe(
        false,
      );
    });

    it('should return true for the same date object', () => {
      const date = new Date('2025-06-15');
      expect(isSameDay(date, date)).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should return false for same day different months', () => {
      expect(isSameDay(new Date('2025-01-15'), new Date('2025-02-15'))).toBe(
        false,
      );
    });

    it('should return false for same day different years', () => {
      expect(isSameDay(new Date('2024-01-15'), new Date('2025-01-15'))).toBe(
        false,
      );
    });

    it('should handle midnight boundary', () => {
      expect(
        isSameDay(
          new Date('2025-01-15T23:59:59.999'),
          new Date('2025-01-15T00:00:00.000'),
        ),
      ).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when first argument is not a valid Date', () => {
      expect(() =>
        isSameDay('not a date' as unknown as Date, new Date()),
      ).toThrow(TypeError);
      expect(() =>
        isSameDay('not a date' as unknown as Date, new Date()),
      ).toThrow('First argument must be a valid Date');
    });

    it('should throw TypeError when second argument is not a valid Date', () => {
      expect(() =>
        isSameDay(new Date(), 'not a date' as unknown as Date),
      ).toThrow(TypeError);
      expect(() =>
        isSameDay(new Date(), 'not a date' as unknown as Date),
      ).toThrow('Second argument must be a valid Date');
    });

    it('should throw TypeError for invalid Date objects', () => {
      expect(() => isSameDay(new Date('invalid'), new Date())).toThrow(
        TypeError,
      );
    });
  });
});
