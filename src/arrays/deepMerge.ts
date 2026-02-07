/**
 * Deep merges two arrays of objects based on a matching key.
 * For each item in array1, finds a matching item in array2 by the specified key
 * and merges their properties.
 *
 * @template T - The object type in array1
 * @template U - The object type in array2
 * @param array1 - The primary array
 * @param array2 - The array to merge from
 * @param key - The property key to match objects on
 * @param isRightMerge - If true, array1 properties take precedence; otherwise array2 wins
 * @returns A new array with merged objects (does not mutate inputs)
 *
 * @example
 * ```typescript
 * const users = [{ id: 1, name: 'Alice' }];
 * const extra = [{ id: 1, age: 30 }];
 * deepMergeArray(users, extra, 'id');
 * // [{ id: 1, name: 'Alice', age: 30 }]
 * ```
 */
export const deepMergeArray = <
  T extends Record<string, unknown>,
  U extends Record<string, unknown>,
>(
  array1: T[],
  array2: U[],
  key: string,
  isRightMerge = false,
): (T | (T & U))[] => {
  return array1.map((item) => {
    const index = array2.findIndex(
      (item2) => item2[key] === (item as Record<string, unknown>)[key],
    );
    if (index !== -1 && array2[index] !== undefined) {
      return isRightMerge
        ? ({ ...array2[index], ...item } as T & U)
        : ({ ...item, ...array2[index] } as T & U);
    }
    return { ...item };
  });
};
