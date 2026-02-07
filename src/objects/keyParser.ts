/**
 * Recursively transforms all values for a specific key in an object using a function.
 *
 * @param keyToModify - The key whose values should be transformed
 * @param object - The source object
 * @param fn - The transformation function to apply to matching values
 * @param visited - Internal WeakSet for circular reference protection
 * @returns A new object with transformed values (does not mutate input)
 *
 * @example
 * ```typescript
 * const obj = { name: 'hello', nested: { name: 'world' } };
 * objectKeyParser('name', obj, (v) => v.toUpperCase());
 * // { name: 'HELLO', nested: { name: 'WORLD' } }
 * ```
 */
export const objectKeyParser = (
  keyToModify: string,
  object: Record<string, any>,
  fn: (value: string) => string,
  visited = new WeakSet(),
): Record<string, any> => {
  if (visited.has(object)) {
    return object;
  }
  visited.add(object);

  const result: Record<string, any> = {};

  for (const key of Object.keys(object)) {
    if (key === keyToModify) {
      result[key] = fn(object[key]);
    } else if (object[key] && typeof object[key] === 'object') {
      result[key] = objectKeyParser(keyToModify, object[key], fn, visited);
    } else {
      result[key] = object[key];
    }
  }

  return result;
};
