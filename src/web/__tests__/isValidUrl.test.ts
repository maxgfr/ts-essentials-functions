import { isValidUrl } from '../isValidUrl';

describe('isValidUrl', () => {
  describe('valid URLs', () => {
    it('should return true for https URL', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
    });

    it('should return true for http URL', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
    });

    it('should return true for URL without protocol', () => {
      expect(isValidUrl('example.com')).toBe(true);
    });

    it('should return true for URL with path', () => {
      expect(isValidUrl('https://example.com/path/to/page')).toBe(true);
    });

    it('should return true for URL with query string', () => {
      expect(isValidUrl('https://example.com?q=search')).toBe(true);
    });

    it('should return true for URL with hash', () => {
      expect(isValidUrl('https://example.com#section')).toBe(true);
    });

    it('should return true for URL with port', () => {
      expect(isValidUrl('https://example.com:8080')).toBe(true);
    });

    it('should return true for URL with subdomain', () => {
      expect(isValidUrl('https://www.example.com')).toBe(true);
    });

    it('should return true for IP address URL', () => {
      expect(isValidUrl('192.168.1.1')).toBe(true);
    });

    it('should return true for IP address with port', () => {
      expect(isValidUrl('192.168.1.1:8080')).toBe(true);
    });

    it('should return true for IP address with path', () => {
      expect(isValidUrl('192.168.1.1:8080/path')).toBe(true);
    });

    it('should return true for URL with multiple subdomains', () => {
      expect(isValidUrl('https://sub.domain.example.com')).toBe(true);
    });
  });

  describe('invalid URLs', () => {
    it('should return false for plain text', () => {
      expect(isValidUrl('not a url')).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(isValidUrl('')).toBe(false);
    });

    it('should return false for just a protocol', () => {
      expect(isValidUrl('https://')).toBe(false);
    });

    it('should return false for URL with spaces', () => {
      expect(isValidUrl('https://example .com')).toBe(false);
    });

    it('should return false for single word without TLD', () => {
      expect(isValidUrl('localhost')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return true for URL with encoded characters in path', () => {
      expect(isValidUrl('https://example.com/path%20to%20page')).toBe(true);
    });

    it('should return true for URL with hyphenated domain', () => {
      expect(isValidUrl('https://my-domain.com')).toBe(true);
    });

    it('should return true for URL with long TLD', () => {
      expect(isValidUrl('https://example.museum')).toBe(true);
    });

    it('should return true for URL with country code TLD', () => {
      expect(isValidUrl('https://example.co.uk')).toBe(true);
    });
  });
});
