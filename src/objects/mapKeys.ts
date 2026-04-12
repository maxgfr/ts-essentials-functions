/**
 * Creates a new object with keys transformed by a mapping function.
 *
 * @template T - The value type
 * @param obj - The source object
 * @param fn - Function to transform each key: (key, value) => newKey
 * @returns A new object with transformed keys
 *
 * @example
 * ```typescript
 * mapKeys({ a: 1, b: 2 }, (key) => key.toUpperCase());
 * // { A: 1, B: 2 }
 *
 * mapKeys({ name: 'Alice' }, (key) => `user_${key}`);
 * // { user_name: 'Alice' }
 * ```
 *
 * @throws {TypeError} When first argument is not an object
 * @throws {TypeError} When second argument is not a function
 */
export function mapKeys<T>(
  obj: Record<string, T>,
  fn: (key: string, value: T) => string,
): Record<string, T> {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new TypeError('First argument must be a plain object');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('Second argument must be a function');
  }

  const result: Record<string, T> = {};

  for (const [key, value] of Object.entries(obj)) {
    result[fn(key, value)] = value;
  }

  return result;
}
