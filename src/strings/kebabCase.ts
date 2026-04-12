import { splitWords } from './_splitWords';

/**
 * Converts a string to kebab-case.
 *
 * @param str - The string to convert
 * @returns The kebab-case string
 *
 * @example
 * ```typescript
 * kebabCase('hello world'); // 'hello-world'
 * kebabCase('helloWorld'); // 'hello-world'
 * kebabCase('FOO_BAR'); // 'foo-bar'
 * kebabCase('PascalCase'); // 'pascal-case'
 * ```
 *
 * @throws {TypeError} When argument is not a string
 */
export function kebabCase(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Argument must be a string');
  }

  const words = splitWords(str);
  return words.map((word) => word.toLowerCase()).join('-');
}
