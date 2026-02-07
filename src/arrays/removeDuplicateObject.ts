/**
 * Removes duplicate objects from an array based on a specific key.
 * Keeps the first occurrence of each unique key value.
 *
 * @template T - The object type
 * @template K - The key type
 * @param originalArray - The array of objects
 * @param key - The property key to check for duplicates
 * @returns A new array without duplicates (does not mutate input)
 *
 * @example
 * ```typescript
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 1, name: 'Alice Clone' },
 * ];
 * removeDuplicateObjectInArray(users, 'id');
 * // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
 * ```
 */
export const removeDuplicateObjectInArray = <T extends Record<string, unknown>>(
  originalArray: T[],
  key: keyof T,
): T[] => {
  const set = new Set();
  return originalArray.filter((el) => {
    const duplicate = set.has(el[key]);
    set.add(el[key]);
    return !duplicate;
  });
};
