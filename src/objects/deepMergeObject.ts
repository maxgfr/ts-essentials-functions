/**
 * Deeply merges two objects, with source values overriding target values.
 *
 * @param target - The target object
 * @param source - The source object (overrides target)
 * @returns A new deeply merged object
 *
 * @example
 * ```typescript
 * const target = { a: 1, b: { c: 2, d: 3 } };
 * const source = { b: { c: 10 }, e: 4 };
 * deepMergeObject(target, source); // { a: 1, b: { c: 10, d: 3 }, e: 4 }
 * ```
 *
 * @throws {TypeError} When either argument is not an object
 *
 * @remarks
 * - Arrays are replaced, not concatenated
 * - Handles circular references via WeakMap
 * - Neither input is mutated
 */
export function deepMergeObject<
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
>(
  target: T,
  source: U,
  visited: WeakMap<object, unknown> = new WeakMap(),
): T & U {
  if (typeof target !== 'object' || target === null || Array.isArray(target)) {
    throw new TypeError('First argument must be a plain object');
  }
  if (typeof source !== 'object' || source === null || Array.isArray(source)) {
    throw new TypeError('Second argument must be a plain object');
  }

  if (visited.has(source)) {
    return visited.get(source) as T & U;
  }

  const result = { ...target } as Record<string, unknown>;
  visited.set(source, result);

  for (const key of Object.keys(source)) {
    const targetVal = result[key];
    const sourceVal = source[key];

    if (
      typeof targetVal === 'object' &&
      targetVal !== null &&
      !Array.isArray(targetVal) &&
      typeof sourceVal === 'object' &&
      sourceVal !== null &&
      !Array.isArray(sourceVal)
    ) {
      result[key] = deepMergeObject(
        targetVal as Record<string, unknown>,
        sourceVal as Record<string, unknown>,
        visited,
      );
    } else {
      result[key] = sourceVal;
    }
  }

  return result as T & U;
}
