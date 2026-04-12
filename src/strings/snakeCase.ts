import { splitWords } from './_splitWords';

/**
 * Converts a string to snake_case.
 *
 * @param str - The string to convert
 * @returns The snake_case string
 *
 * @example
 * ```typescript
 * snakeCase('hello world'); // 'hello_world'
 * snakeCase('helloWorld'); // 'hello_world'
 * snakeCase('foo-bar'); // 'foo_bar'
 * snakeCase('FOO BAR'); // 'foo_bar'
 * ```
 *
 * @throws {TypeError} When argument is not a string
 */
export function snakeCase(str: string): string {
  if (typeof str !== 'string') {
    throw new TypeError('Argument must be a string');
  }

  const words = splitWords(str);
  return words.map((word) => word.toLowerCase()).join('_');
}
