/**
 * Detects changes between two objects and returns a partial object
 * containing keys that differ between obj1 and obj2.
 *
 * @template T - The object type
 * @param obj1 - The first object
 * @param obj2 - The second object
 * @returns An object containing keys and values that differ
 *
 * @example
 * ```typescript
 * const diff = diffObject({ a: 1, b: 2 }, { a: 1, b: 3 });
 * // Returns { b: 2 } - b differs, value from obj1
 * ```
 *
 * @remarks
 * - Uses Object.is for comparison (handles NaN correctly)
 * - Keys only in obj1 are included with obj1 values
 * - Keys only in obj2 are included with obj2 values
 * - Keys with different values are included with obj1 values
 */
export const diffObject = <T extends Record<string, unknown>>(
  obj1: T = {} as T,
  obj2: T = {} as T,
): Partial<T> => {
  const result: Partial<T> = {};

  for (const key in obj1) {
    if (!(key in obj2) || !Object.is(obj1[key], obj2[key])) {
      result[key] = obj1[key];
    }
  }

  for (const key in obj2) {
    if (!(key in obj1)) {
      result[key] = obj2[key];
    }
  }

  return result;
};
