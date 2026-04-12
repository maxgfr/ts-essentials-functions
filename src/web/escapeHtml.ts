/**
 * Escapes HTML special characters to prevent XSS attacks.
 *
 * @param str - The string to escape
 * @returns The escaped string
 *
 * @example
 * ```typescript
 * escapeHtml('<script>alert("xss")</script>');
 * // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 *
 * escapeHtml('Tom & Jerry'); // 'Tom &amp; Jerry'
 * ```
 *
 * @throws {TypeError} When argument is not a string
 *
 * @remarks
 * - Escapes: & < > " '
 * - Safe for inserting user content into HTML
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Argument must be a string');
  }

  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
