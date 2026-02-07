import { isValidMail } from '../isValidMail';

describe('isValidMail', () => {
  describe('valid emails', () => {
    it('should return true for a standard email', () => {
      expect(isValidMail('user@example.com')).toBe(true);
    });

    it('should return true for an email with subdomain', () => {
      expect(isValidMail('user@mail.example.com')).toBe(true);
    });

    it('should return true for an email with dots in local part', () => {
      expect(isValidMail('first.last@example.com')).toBe(true);
    });

    it('should return true for an email with plus sign', () => {
      expect(isValidMail('user+tag@example.com')).toBe(true);
    });

    it('should return true for an email with hyphen in domain', () => {
      expect(isValidMail('user@my-domain.com')).toBe(true);
    });

    it('should return true for an email with numbers', () => {
      expect(isValidMail('user123@example456.com')).toBe(true);
    });

    it('should return true for an email with IP address domain', () => {
      expect(isValidMail('user@[192.168.1.1]')).toBe(true);
    });

    it('should return true for an email with two-letter TLD', () => {
      expect(isValidMail('user@example.co')).toBe(true);
    });

    it('should return true for an email with long TLD', () => {
      expect(isValidMail('user@example.museum')).toBe(true);
    });
  });

  describe('invalid emails', () => {
    it('should return false for a plain string', () => {
      expect(isValidMail('invalid')).toBe(false);
    });

    it('should return false for a string without @ sign', () => {
      expect(isValidMail('userexample.com')).toBe(false);
    });

    it('should return false for a string without domain', () => {
      expect(isValidMail('user@')).toBe(false);
    });

    it('should return false for a string without local part', () => {
      expect(isValidMail('@example.com')).toBe(false);
    });

    it('should return false for an email with spaces', () => {
      expect(isValidMail('user @example.com')).toBe(false);
    });

    it('should return false for double dots in local part', () => {
      expect(isValidMail('user..name@example.com')).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(isValidMail('')).toBe(false);
    });

    it('should return false for an email with single char TLD', () => {
      expect(isValidMail('user@example.c')).toBe(false);
    });

    it('should return false for an email with multiple @ signs', () => {
      expect(isValidMail('user@@example.com')).toBe(false);
    });

    it('should return false for an email ending with a dot', () => {
      expect(isValidMail('user@example.com.')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return true for a quoted local part', () => {
      expect(isValidMail('"user"@example.com')).toBe(true);
    });

    it('should return true for underscores in local part', () => {
      expect(isValidMail('user_name@example.com')).toBe(true);
    });

    it('should return true for hyphens in local part', () => {
      expect(isValidMail('user-name@example.com')).toBe(true);
    });
  });
});
