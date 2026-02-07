/**
 * Creates a new object with only the specified keys from the source object.
 *
 * @template T - The source object type
 * @template K - The key type
 * @param obj - The source object
 * @param keys - Array of keys to pick
 * @returns A new object with only the specified keys
 *
 * @example
 * ```typescript
 * const user = { id: 1, name: 'Alice', age: 30, email: 'alice@example.com' };
 * pick(user, ['name', 'email']);
 * // { name: 'Alice', email: 'alice@example.com' }
 * ```
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }

  return result;
}
