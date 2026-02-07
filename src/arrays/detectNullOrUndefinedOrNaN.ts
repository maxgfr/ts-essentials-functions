import { hasObjectNullOrUndefined } from '../objects';

/**
 * Checks if an array (potentially nested with objects) contains any null, undefined, or NaN values.
 *
 * @param array - The array to check
 * @returns True if any null, undefined, or NaN value is found
 *
 * @example
 * ```typescript
 * detectNullOrUndefinedOrNaNInArray([1, 2, null]); // true
 * detectNullOrUndefinedOrNaNInArray([1, 2, 3]); // false
 * detectNullOrUndefinedOrNaNInArray([{ a: undefined }]); // true
 * ```
 */
export const detectNullOrUndefinedOrNaNInArray = (
  array: unknown[],
): boolean => {
  return array.some((item) => {
    if (item && typeof item === 'object') {
      const keys = Object.keys(item as Record<string, unknown>);
      for (const key of keys) {
        const value = (item as Record<string, unknown>)[key];
        if (Array.isArray(value)) {
          return detectNullOrUndefinedOrNaNInArray(value);
        } else if (typeof value === 'object') {
          return hasObjectNullOrUndefined(value);
        }
        if (value === null || value === undefined || Number.isNaN(value)) {
          return true;
        }
      }
    }
    return item === null || item === undefined || Number.isNaN(item);
  });
};
