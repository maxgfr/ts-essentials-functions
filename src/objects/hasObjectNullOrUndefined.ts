/**
 * Recursively checks if an object contains any null, undefined, or NaN values.
 *
 * @param obj - The value to check
 * @param visited - Internal WeakSet for circular reference protection
 * @returns True if any null, undefined, or NaN value is found
 *
 * @example
 * ```typescript
 * hasObjectNullOrUndefined({ a: 1, b: null }); // true
 * hasObjectNullOrUndefined({ a: 1, b: 2 }); // false
 * hasObjectNullOrUndefined({ a: { b: undefined } }); // true
 * ```
 */
export const hasObjectNullOrUndefined = (
  obj: unknown,
  visited = new WeakSet(),
): boolean => {
  if (obj === null || obj === undefined || Number.isNaN(obj)) {
    return true;
  }
  if (typeof obj === 'object' && obj !== null) {
    if (visited.has(obj)) return false;
    visited.add(obj);

    const keys = Object.keys(obj as Record<string, unknown>);
    for (const key of keys) {
      if (
        hasObjectNullOrUndefined(
          (obj as Record<string, unknown>)[key],
          visited,
        )
      ) {
        return true;
      }
    }
  }
  return false;
};
