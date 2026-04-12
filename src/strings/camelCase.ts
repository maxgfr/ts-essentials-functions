import { splitWords } from './_splitWords';

/**
 * Converts a string to camelCase.
 *
 * @param str - The string to convert
 * @returns The camelCase string
 *
 * @example
 * ```typescript
 * camelCase('hello world'); // 'helloWorld'
 * camelCase('foo-bar'); // 'fooBar'
 * camelCase('FOO_BAR'); // 'fooBar'
 * camelCase('PascalCase'); // 'pascalCase'
 * ```
 *
 * @throws {TypeError} When argument is not a string
 */
export function camelCase(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Argument must be a string');
  }

  const words = splitWords(str);

  if (words.length === 0) {
    return '';
  }

  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index === 0) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}
