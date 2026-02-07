/**
 * Type guard that checks if a value is an object (including functions, excluding null).
 *
 * @param v - The value to check
 * @returns True if the value is an object or function and not null
 *
 * @example
 * ```typescript
 * isObject({}); // true
 * isObject([]); // true
 * isObject(null); // false
 * isObject(42); // false
 * ```
 */
export const isObject = (v: unknown): v is object =>
  (typeof v === 'object' || typeof v === 'function') && v !== null;
