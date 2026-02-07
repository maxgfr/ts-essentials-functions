import { stripSimpleHtmlTags, removeTag } from '../removeTag';

describe('stripSimpleHtmlTags', () => {
  describe('happy path', () => {
    it('should remove simple HTML tags', () => {
      expect(stripSimpleHtmlTags('<p>Hello</p>')).toBe('Hello');
    });

    it('should remove nested HTML tags', () => {
      expect(stripSimpleHtmlTags('<p>Hello <b>world</b></p>')).toBe(
        'Hello world',
      );
    });

    it('should remove self-closing tags', () => {
      expect(stripSimpleHtmlTags('Hello<br/>world')).toBe('Helloworld');
    });

    it('should remove tags with attributes', () => {
      expect(
        stripSimpleHtmlTags('<a href="https://example.com">link</a>'),
      ).toBe('link');
    });

    it('should remove multiple different tags', () => {
      expect(
        stripSimpleHtmlTags('<h1>Title</h1><p>Text</p><span>More</span>'),
      ).toBe('TitleTextMore');
    });

    it('should remove tags with multiline content', () => {
      const input = '<div>\n  <p>Hello</p>\n</div>';
      expect(stripSimpleHtmlTags(input)).toBe('\n  Hello\n');
    });
  });

  describe('edge cases', () => {
    it('should return the same string when there are no HTML tags', () => {
      expect(stripSimpleHtmlTags('Hello world')).toBe('Hello world');
    });

    it('should return an empty string when given an empty string', () => {
      expect(stripSimpleHtmlTags('')).toBe('');
    });

    it('should return an empty string when the string is only tags', () => {
      expect(stripSimpleHtmlTags('<div></div>')).toBe('');
    });

    it('should handle consecutive tags', () => {
      expect(stripSimpleHtmlTags('<b>bold</b> and <i>italic</i>')).toBe(
        'bold and italic',
      );
    });

    it('should remove tags but preserve text between them', () => {
      expect(
        stripSimpleHtmlTags('before <span>middle</span> after'),
      ).toBe('before middle after');
    });

    it('should handle tags with newlines inside the tag itself', () => {
      expect(stripSimpleHtmlTags('<div\n  class="foo">content</div>')).toBe(
        'content',
      );
    });
  });
});

describe('removeTag (deprecated alias)', () => {
  it('should be the same function as stripSimpleHtmlTags', () => {
    expect(removeTag).toBe(stripSimpleHtmlTags);
  });

  it('should work identically to stripSimpleHtmlTags', () => {
    const input = '<p>Hello <b>world</b></p>';

    expect(removeTag(input)).toBe(stripSimpleHtmlTags(input));
  });

  it('should remove HTML tags when called directly', () => {
    expect(removeTag('<div>content</div>')).toBe('content');
  });
});
