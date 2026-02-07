import { addBusinessDays } from '../addBusinessDays';

describe('addBusinessDays', () => {
  describe('happy path', () => {
    it('should add 1 business day from a Monday', () => {
      const monday = new Date('2025-01-06');
      const result = addBusinessDays(monday, 1);

      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(7);
    });

    it('should skip weekends when adding from Friday', () => {
      const friday = new Date('2025-01-03');
      const result = addBusinessDays(friday, 1);

      expect(result.getDay()).toBe(1);
      expect(result.getDate()).toBe(6);
    });

    it('should add 5 business days (one full work week)', () => {
      const monday = new Date('2025-01-06');
      const result = addBusinessDays(monday, 5);

      expect(result.getDate()).toBe(13);
    });

    it('should add 10 business days (two full work weeks)', () => {
      const monday = new Date('2025-01-06');
      const result = addBusinessDays(monday, 10);

      expect(result.getDate()).toBe(20);
    });

    it('should handle adding from a Wednesday', () => {
      const wednesday = new Date('2025-01-08');
      const result = addBusinessDays(wednesday, 3);

      expect(result.getDate()).toBe(13);
    });
  });

  describe('negative days', () => {
    it('should subtract 1 business day from a Monday to get Friday', () => {
      const monday = new Date('2025-01-06');
      const result = addBusinessDays(monday, -1);

      expect(result.getDay()).toBe(5);
      expect(result.getDate()).toBe(3);
    });

    it('should subtract 5 business days (one full work week)', () => {
      const monday = new Date('2025-01-13');
      const result = addBusinessDays(monday, -5);

      expect(result.getDate()).toBe(6);
    });
  });

  describe('weekend starting dates', () => {
    it('should skip the weekend when starting from Saturday and adding days', () => {
      const saturday = new Date('2025-01-04');
      const result = addBusinessDays(saturday, 1);

      expect(result.getDay()).toBe(1);
      expect(result.getDate()).toBe(6);
    });

    it('should skip the weekend when starting from Sunday and adding days', () => {
      const sunday = new Date('2025-01-05');
      const result = addBusinessDays(sunday, 1);

      expect(result.getDay()).toBe(1);
      expect(result.getDate()).toBe(6);
    });
  });

  describe('edge cases', () => {
    it('should return the same date when adding 0 business days', () => {
      const date = new Date('2025-01-08');
      const result = addBusinessDays(date, 0);

      expect(result.getDate()).toBe(8);
    });

    it('should not mutate the original date', () => {
      const original = new Date('2025-01-06');
      const originalTime = original.getTime();
      addBusinessDays(original, 5);

      expect(original.getTime()).toBe(originalTime);
    });

    it('should handle month boundaries', () => {
      const date = new Date('2025-01-31');
      const result = addBusinessDays(date, 1);

      expect(result.getMonth()).toBe(1);
      expect(result.getDate()).toBe(3);
    });

    it('should handle year boundaries', () => {
      const date = new Date('2024-12-31');
      const result = addBusinessDays(date, 1);

      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0);
      expect(result.getDate()).toBe(1);
    });
  });

  describe('error handling', () => {
    it('should throw TypeError for non-Date input', () => {
      expect(() => addBusinessDays('2025-01-01' as unknown as Date, 1)).toThrow(
        TypeError,
      );
      expect(() => addBusinessDays('2025-01-01' as unknown as Date, 1)).toThrow(
        'First argument must be a valid Date',
      );
    });

    it('should throw TypeError for invalid Date', () => {
      expect(() => addBusinessDays(new Date('invalid'), 1)).toThrow(TypeError);
    });

    it('should throw TypeError for null input', () => {
      expect(() => addBusinessDays(null as unknown as Date, 1)).toThrow(
        TypeError,
      );
    });

    it('should throw TypeError for undefined input', () => {
      expect(() => addBusinessDays(undefined as unknown as Date, 1)).toThrow(
        TypeError,
      );
    });
  });
});
