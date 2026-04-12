import { escapeHtml } from '../escapeHtml';

describe('escapeHtml', () => {
  describe('happy path', () => {
    it('should escape angle brackets', () => {
      expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
    });

    it('should escape ampersands', () => {
      expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('should escape quotes', () => {
      expect(escapeHtml('"hello"')).toBe('&quot;hello&quot;');
    });

    it('should escape single quotes', () => {
      expect(escapeHtml("it's")).toBe('it&#39;s');
    });

    it('should escape script tags', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
      );
    });

    it('should escape all special chars together', () => {
      expect(escapeHtml('<a href="test" data-x=\'y\'>&</a>')).toBe(
        '&lt;a href=&quot;test&quot; data-x=&#39;y&#39;&gt;&amp;&lt;/a&gt;',
      );
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should return string unchanged when no special chars', () => {
      expect(escapeHtml('hello world')).toBe('hello world');
    });

    it('should handle already escaped entities', () => {
      expect(escapeHtml('&amp;')).toBe('&amp;amp;');
    });
  });

  describe('error handling', () => {
    it('should throw TypeError when argument is not a string', () => {
      expect(() => escapeHtml(123 as unknown as string)).toThrow(TypeError);
      expect(() => escapeHtml(123 as unknown as string)).toThrow(
        'Argument must be a string',
      );
    });
  });
});
