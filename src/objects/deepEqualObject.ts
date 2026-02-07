/**
 * Performs a deep equality comparison between two objects.
 *
 * @param a - The first object
 * @param b - The second object
 * @param visited - Internal WeakMap for circular reference protection
 * @returns True if the objects are deeply equal
 *
 * @example
 * ```typescript
 * deepEqualObject({ a: { b: 1 } }, { a: { b: 1 } }); // true
 * deepEqualObject({ a: 1 }, { a: 2 }); // false
 * ```
 *
 * @remarks
 * - Handles circular references safely
 * - Compares using strict equality for primitives
 * - Null-safe: null !== {}
 */
export const deepEqualObject = (
  a: Record<string, unknown>,
  b: Record<string, unknown>,
  visited = new WeakSet(),
): boolean => {
  if (a === b) return true;
  if (!a || !b) return false;

  if (visited.has(a)) return true;
  visited.add(a);

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  for (const key of aKeys) {
    const aVal = a[key];
    const bVal = b[key];

    if (
      aVal !== null &&
      bVal !== null &&
      typeof aVal === 'object' &&
      typeof bVal === 'object'
    ) {
      if (
        !deepEqualObject(
          aVal as Record<string, unknown>,
          bVal as Record<string, unknown>,
          visited,
        )
      ) {
        return false;
      }
    } else if (!Object.is(aVal, bVal)) {
      return false;
    }
  }
  return true;
};
