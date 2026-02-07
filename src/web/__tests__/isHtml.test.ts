import { isHTML } from '../isHtml';

describe('isHTML', () => {
  describe('happy path - HTML detected', () => {
    it('should return true for a simple HTML tag', () => {
      expect(isHTML('<p>Hello</p>')).toBe(true);
    });

    it('should return true for a self-closing tag', () => {
      expect(isHTML('<br/>')).toBe(true);
    });

    it('should return true for a self-closing tag with space', () => {
      expect(isHTML('<br />')).toBe(true);
    });

    it('should return true for a tag with attributes', () => {
      expect(isHTML('<a href="https://example.com">link</a>')).toBe(true);
    });

    it('should return true for a tag with single-quote attributes', () => {
      expect(isHTML("<div class='container'>content</div>")).toBe(true);
    });

    it('should return true for HTML entities', () => {
      expect(isHTML('&amp;')).toBe(true);
    });

    it('should return true for numeric HTML entities', () => {
      expect(isHTML('&#169;')).toBe(true);
    });

    it('should return true for named HTML entities', () => {
      expect(isHTML('&lt;')).toBe(true);
    });

    it('should return true for tags with numbered names like h1', () => {
      expect(isHTML('<h1>Title</h1>')).toBe(true);
    });

    it('should return true for img tag with attributes', () => {
      expect(isHTML('<img src="photo.jpg" alt="photo"/>')).toBe(true);
    });

    it('should return true for input tag', () => {
      expect(isHTML('<input type="text"/>')).toBe(true);
    });
  });

  describe('happy path - not HTML', () => {
    it('should return false for plain text', () => {
      expect(isHTML('Hello world')).toBe(false);
    });

    it('should return false for an empty string', () => {
      expect(isHTML('')).toBe(false);
    });

    it('should return false for numbers as strings', () => {
      expect(isHTML('12345')).toBe(false);
    });

    it('should return false for text with angle brackets but no valid tags', () => {
      expect(isHTML('3 < 5 and 10 > 7')).toBe(false);
    });

    it('should return false for a lone ampersand', () => {
      expect(isHTML('&')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should return true for HTML mixed with plain text', () => {
      expect(isHTML('Hello <b>world</b>')).toBe(true);
    });

    it('should return true for nested HTML tags', () => {
      expect(isHTML('<div><p>Text</p></div>')).toBe(true);
    });

    it('should return true for multi-attribute tags', () => {
      expect(
        isHTML('<div class="foo" id="bar">content</div>'),
      ).toBe(true);
    });

    it('should handle tags with data attributes', () => {
      expect(isHTML('<div data-value="test">content</div>')).toBe(true);
    });
  });
});
