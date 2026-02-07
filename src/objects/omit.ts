/**
 * Creates a new object without the specified keys.
 *
 * @template T - The source object type
 * @template K - The key type to omit
 * @param obj - The source object
 * @param keys - Array of keys to exclude
 * @returns A new object without the specified keys
 *
 * @example
 * ```typescript
 * const user = { id: 1, name: 'Alice', password: 'secret' };
 * omit(user, ['password']);
 * // { id: 1, name: 'Alice' }
 * ```
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const keysToOmit = new Set<PropertyKey>(keys);
  const result = {} as Record<string, unknown>;

  for (const key of Object.keys(obj)) {
    if (!keysToOmit.has(key)) {
      result[key] = obj[key];
    }
  }

  return result as Omit<T, K>;
}
