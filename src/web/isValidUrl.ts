/**
 * Validates if a string is a valid URL.
 *
 * @param str - The string to validate
 * @returns True if the string is a valid URL
 *
 * @example
 * ```typescript
 * isValidUrl('https://example.com'); // true
 * isValidUrl('not a url'); // false
 * isValidUrl('192.168.1.1:8080/path'); // true
 * ```
 */
export function isValidUrl(str: string): boolean {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  return !!pattern.test(str);
}
