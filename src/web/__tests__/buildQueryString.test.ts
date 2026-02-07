import { buildQueryString } from '../buildQueryString';

describe('buildQueryString', () => {
  describe('happy path', () => {
    it('should build a query string from simple key-value pairs', () => {
      const result = buildQueryString({ name: 'Alice', age: 30 });

      expect(result).toBe('name=Alice&age=30');
    });

    it('should encode special characters in values', () => {
      const result = buildQueryString({ q: 'hello world' });

      expect(result).toBe('q=hello%20world');
    });

    it('should encode special characters in keys', () => {
      const result = buildQueryString({ 'my key': 'value' });

      expect(result).toBe('my%20key=value');
    });

    it('should handle number values', () => {
      const result = buildQueryString({ page: 1, limit: 10 });

      expect(result).toBe('page=1&limit=10');
    });

    it('should handle boolean values', () => {
      const result = buildQueryString({ active: true, deleted: false });

      expect(result).toBe('active=true&deleted=false');
    });

    it('should handle string values with special URL characters', () => {
      const result = buildQueryString({ url: 'https://example.com?a=1&b=2' });

      expect(result).toBe('url=https%3A%2F%2Fexample.com%3Fa%3D1%26b%3D2');
    });
  });

  describe('null and undefined handling', () => {
    it('should skip null values', () => {
      const result = buildQueryString({ name: 'Alice', age: null });

      expect(result).toBe('name=Alice');
    });

    it('should skip undefined values', () => {
      const result = buildQueryString({ name: 'Alice', age: undefined });

      expect(result).toBe('name=Alice');
    });

    it('should skip all null/undefined values and include the rest', () => {
      const result = buildQueryString({
        a: 'yes',
        b: null,
        c: undefined,
        d: 'ok',
      });

      expect(result).toBe('a=yes&d=ok');
    });

    it('should return empty string when all values are null or undefined', () => {
      const result = buildQueryString({ a: null, b: undefined });

      expect(result).toBe('');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty object', () => {
      const result = buildQueryString({});

      expect(result).toBe('');
    });

    it('should handle a single parameter', () => {
      const result = buildQueryString({ key: 'value' });

      expect(result).toBe('key=value');
    });

    it('should handle empty string values', () => {
      const result = buildQueryString({ key: '' });

      expect(result).toBe('key=');
    });

    it('should handle zero as a value', () => {
      const result = buildQueryString({ count: 0 });

      expect(result).toBe('count=0');
    });

    it('should convert non-string values to string', () => {
      const result = buildQueryString({ arr: [1, 2, 3] as unknown as string });

      expect(result).toBe('arr=1%2C2%2C3');
    });
  });
});
