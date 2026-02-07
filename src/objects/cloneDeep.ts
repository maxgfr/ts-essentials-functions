/**
 * Creates a deep clone of a value, handling circular references.
 *
 * @template T - The value type
 * @param obj - The value to clone
 * @param visited - Internal WeakMap for circular reference tracking
 * @returns A deep clone of the input
 *
 * @example
 * ```typescript
 * const original = { a: 1, nested: { b: 2 } };
 * const clone = cloneDeep(original);
 * clone.nested.b = 99;
 * original.nested.b; // Still 2
 * ```
 *
 * @remarks
 * - Handles circular references safely
 * - Clones Date, RegExp, Map, Set, Arrays, and plain objects
 * - Primitives are returned as-is
 */
export function cloneDeep<T>(obj: T, visited = new WeakMap()): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (visited.has(obj as object)) {
    return visited.get(obj as object);
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as T;
  }

  if (obj instanceof Map) {
    const mapClone = new Map();
    visited.set(obj as object, mapClone);
    for (const [key, value] of obj) {
      mapClone.set(cloneDeep(key, visited), cloneDeep(value, visited));
    }
    return mapClone as T;
  }

  if (obj instanceof Set) {
    const setClone = new Set();
    visited.set(obj as object, setClone);
    for (const value of obj) {
      setClone.add(cloneDeep(value, visited));
    }
    return setClone as T;
  }

  if (Array.isArray(obj)) {
    const arrClone: unknown[] = [];
    visited.set(obj as object, arrClone);
    for (const item of obj) {
      arrClone.push(cloneDeep(item, visited));
    }
    return arrClone as T;
  }

  const clone = {} as Record<string, unknown>;
  visited.set(obj as object, clone);

  for (const key of Object.keys(obj as object)) {
    clone[key] = cloneDeep((obj as Record<string, unknown>)[key], visited);
  }

  return clone as T;
}
