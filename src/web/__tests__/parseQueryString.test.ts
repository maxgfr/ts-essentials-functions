import { parseQueryString } from '../parseQueryString';

describe('parseQueryString', () => {
  describe('happy path', () => {
    it('should parse a simple query string from a URL', () => {
      const result = parseQueryString('https://example.com?name=Alice&age=30');

      expect(result).toEqual({ name: 'Alice', age: '30' });
    });

    it('should parse a query string starting with ?', () => {
      const result = parseQueryString('?foo=bar&baz=qux');

      expect(result).toEqual({ foo: 'bar', baz: 'qux' });
    });

    it('should parse a single parameter', () => {
      const result = parseQueryString('https://example.com?key=value');

      expect(result).toEqual({ key: 'value' });
    });

    it('should decode URI-encoded values', () => {
      const result = parseQueryString('?q=hello%20world');

      expect(result).toEqual({ q: 'hello world' });
    });

    it('should decode URI-encoded keys', () => {
      const result = parseQueryString('?my%20key=value');

      expect(result).toEqual({ 'my key': 'value' });
    });
  });

  describe('edge cases', () => {
    it('should return empty object when there is no query string', () => {
      const result = parseQueryString('https://example.com');

      expect(result).toEqual({});
    });

    it('should return empty object for an empty string', () => {
      const result = parseQueryString('');

      expect(result).toEqual({});
    });

    it('should return empty object when query string is empty after ?', () => {
      const result = parseQueryString('https://example.com?');

      expect(result).toEqual({});
    });

    it('should handle values containing equals signs', () => {
      const result = parseQueryString('?formula=a=b+c');

      expect(result).toEqual({ formula: 'a=b+c' });
    });

    it('should handle parameters with empty values', () => {
      const result = parseQueryString('?key=');

      expect(result).toEqual({ key: '' });
    });

    it('should strip hash fragment from query string', () => {
      const result = parseQueryString('https://example.com?name=Alice#section');

      expect(result).toEqual({ name: 'Alice' });
    });

    it('should handle hash after multiple parameters', () => {
      const result = parseQueryString('https://example.com?a=1&b=2#fragment');

      expect(result).toEqual({ a: '1', b: '2' });
    });

    it('should handle URL with path and query', () => {
      const result = parseQueryString(
        'https://example.com/path/to/resource?page=1&limit=10',
      );

      expect(result).toEqual({ page: '1', limit: '10' });
    });

    it('should handle multiple question marks by using only the first', () => {
      const result = parseQueryString('https://example.com?a=1?b=2');

      expect(result).toEqual({ a: '1?b=2' });
    });

    it('should skip pairs with empty keys', () => {
      const result = parseQueryString('?=value&name=Alice');

      expect(result).toEqual({ name: 'Alice' });
    });
  });

  describe('special characters', () => {
    it('should handle encoded ampersand in values', () => {
      const result = parseQueryString('?text=hello%26world');

      expect(result).toEqual({ text: 'hello&world' });
    });

    it('should handle multiple encoded characters', () => {
      const result = parseQueryString('?url=https%3A%2F%2Fexample.com');

      expect(result).toEqual({ url: 'https://example.com' });
    });
  });
});
