/**
 * Recursively removes undefined fields from an object.
 *
 * @param obj - The source object
 * @param visited - Internal WeakSet for circular reference protection
 * @returns A new object without undefined fields (does not mutate input)
 *
 * @example
 * ```typescript
 * removeEmptyFieldObject({ a: 1, b: undefined, c: { d: undefined, e: 2 } });
 * // { a: 1, c: { e: 2 } }
 * ```
 */
export const removeEmptyFieldObject = (
  obj: Record<string, any>,
  visited = new WeakSet(),
): Record<string, any> => {
  if (visited.has(obj)) {
    return obj;
  }
  visited.add(obj);

  const result: Record<string, any> = {};

  for (const key of Object.keys(obj)) {
    if (obj[key] === undefined) {
      continue;
    }
    if (obj[key] && typeof obj[key] === 'object') {
      result[key] = removeEmptyFieldObject(obj[key], visited);
    } else {
      result[key] = obj[key];
    }
  }

  return result;
};
