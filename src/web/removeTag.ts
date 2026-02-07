/**
 * Strips simple HTML tags from a string using regex.
 *
 * **WARNING: NOT suitable for XSS prevention. Use DOMPurify for sanitization.**
 *
 * @param text - The input string containing HTML tags
 * @returns The string with HTML tags removed
 *
 * @example
 * ```typescript
 * stripSimpleHtmlTags('<p>Hello <b>world</b></p>');
 * // 'Hello world'
 * ```
 */
export function stripSimpleHtmlTags(text: string): string {
  return text.replace(/<(?:.|\n)*?>/gm, '');
}

/**
 * @deprecated Use `stripSimpleHtmlTags` instead. This alias will be removed in v3.0.0.
 */
export const removeTag = stripSimpleHtmlTags;
