/**
 * Converts a string into a URL-friendly slug.
 *
 * @param str - The string to slugify
 * @returns A lowercase, hyphen-separated slug
 *
 * @example
 * ```typescript
 * slugify('Hello World!'); // 'hello-world'
 * slugify('Crème Brûlée'); // 'creme-brulee'
 * slugify('  Multiple   Spaces  '); // 'multiple-spaces'
 * ```
 *
 * @throws {TypeError} When argument is not a string
 *
 * @remarks
 * - Strips accents using Unicode NFD normalization
 * - Replaces non-alphanumeric characters with hyphens
 * - Collapses consecutive hyphens and trims leading/trailing hyphens
 * - Does not transliterate non-Latin scripts (e.g., Chinese, Arabic)
 */
export function slugify(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Argument must be a string');
  }

  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
