import { isBefore } from '../isBefore';

describe('isBefore', () => {
  describe('happy path', () => {
    it('should return true when date1 is before date2', () => {
      expect(isBefore(new Date('2025-01-01'), new Date('2025-12-31'))).toBe(
        true,
      );
    });

    it('should return false when date1 is after date2', () => {
      expect(isBefore(new Date('2025-12-31'), new Date('2025-01-01'))).toBe(
        false,
      );
    });

    it('should return false for equal dates', () => {
      const date = new Date('2025-06-15T12:00:00');
      expect(isBefore(date, new Date(date))).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle millisecond differences', () => {
      expect(
        isBefore(
          new Date('2025-01-01T00:00:00.000'),
          new Date('2025-01-01T00:00:00.001'),
        ),
      ).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for invalid first date', () => {
      expect(() => isBefore('not' as unknown as Date, new Date())).toThrow(
        TypeError,
      );
    });

    it('should throw TypeError for invalid second date', () => {
      expect(() => isBefore(new Date(), 'not' as unknown as Date)).toThrow(
        TypeError,
      );
    });
  });
});
