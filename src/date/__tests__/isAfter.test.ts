import { isAfter } from '../isAfter';

describe('isAfter', () => {
  describe('happy path', () => {
    it('should return true when date1 is after date2', () => {
      expect(isAfter(new Date('2025-12-31'), new Date('2025-01-01'))).toBe(
        true,
      );
    });

    it('should return false when date1 is before date2', () => {
      expect(isAfter(new Date('2025-01-01'), new Date('2025-12-31'))).toBe(
        false,
      );
    });

    it('should return false for equal dates', () => {
      const date = new Date('2025-06-15T12:00:00');
      expect(isAfter(date, new Date(date))).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle millisecond differences', () => {
      expect(
        isAfter(
          new Date('2025-01-01T00:00:00.001'),
          new Date('2025-01-01T00:00:00.000'),
        ),
      ).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for invalid first date', () => {
      expect(() => isAfter('not' as unknown as Date, new Date())).toThrow(
        TypeError,
      );
    });

    it('should throw TypeError for invalid second date', () => {
      expect(() => isAfter(new Date(), 'not' as unknown as Date)).toThrow(
        TypeError,
      );
    });
  });
});
