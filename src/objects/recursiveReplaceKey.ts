/**
 * Recursively traverses an object and replaces string values that contain
 * a target word using a replacement mapping.
 *
 * @template T - The object type
 * @param object - The source object to process
 * @param objectKeysToReplace - Mapping of substrings to their replacements
 * @param wordToDetect - The word that triggers replacement
 * @param visited - Internal WeakSet for circular reference protection
 * @returns A new object with replacements applied (does not mutate input)
 *
 * @example
 * ```typescript
 * const obj = { url: 'http://old.example.com', nested: { link: 'http://old.example.com/page' } };
 * const result = recursiveReplaceKey(obj, { 'old.example.com': 'new.example.com' }, 'old');
 * // { url: 'new.example.com', nested: { link: 'new.example.com' } }
 * ```
 *
 * @remarks
 * - Does not mutate the input object
 * - Handles circular references safely
 * - Handles arrays
 */
export const recursiveReplaceKey = <T extends Record<string, any>>(
  object: T,
  objectKeysToReplace: Record<string, string>,
  wordToDetect: string,
  visited = new WeakSet(),
): T => {
  if (!object || typeof object !== 'object') {
    return object;
  }

  if (visited.has(object)) {
    return object;
  }
  visited.add(object);

  const result: any = Array.isArray(object) ? [] : {};

  for (const [key, value] of Object.entries(object)) {
    if (value && typeof value === 'object') {
      result[key] = recursiveReplaceKey(
        value,
        objectKeysToReplace,
        wordToDetect,
        visited,
      );
    } else if (typeof value === 'string' && value.includes(wordToDetect)) {
      let replaced = value;
      for (const [keyToReplace, valueToReplace] of Object.entries(
        objectKeysToReplace,
      )) {
        if (replaced.includes(keyToReplace)) {
          replaced = valueToReplace;
          break;
        }
      }
      result[key] = replaced;
    } else {
      result[key] = value;
    }
  }

  return result as T;
};
