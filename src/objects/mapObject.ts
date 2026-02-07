/**
 * Maps over the values of an object, creating a new object with transformed values.
 *
 * @template T - The source value type
 * @template U - The target value type
 * @param obj - The source object
 * @param fn - The transformation function receiving (value, key)
 * @returns A new object with the same keys and transformed values
 *
 * @example
 * ```typescript
 * mapObject({ a: 1, b: 2, c: 3 }, (v) => v * 2);
 * // { a: 2, b: 4, c: 6 }
 *
 * mapObject({ name: 'alice', role: 'admin' }, (v) => v.toUpperCase());
 * // { name: 'ALICE', role: 'ADMIN' }
 * ```
 */
export function mapObject<T, U>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => U,
): Record<string, U> {
  const result: Record<string, U> = {};

  for (const [key, value] of Object.entries(obj)) {
    result[key] = fn(value, key);
  }

  return result;
}
