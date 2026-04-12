/**
 * Inverts an object's keys and values.
 *
 * @param obj - The object to invert
 * @returns A new object with keys and values swapped
 *
 * @example
 * ```typescript
 * invertObject({ a: '1', b: '2' }); // { '1': 'a', '2': 'b' }
 * invertObject({ name: 'Alice', role: 'admin' }); // { Alice: 'name', admin: 'role' }
 * ```
 *
 * @throws {TypeError} When argument is not an object
 *
 * @remarks
 * - If multiple keys have the same value, the last one wins
 * - Values must be valid as object keys (strings or numbers)
 */
export function invertObject<V extends string | number>(
  obj: Record<string, V>,
): Record<string, string> {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new TypeError('Argument must be a plain object');
  }

  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    result[String(value)] = key;
  }

  return result;
}
