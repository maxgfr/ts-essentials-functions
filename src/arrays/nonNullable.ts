/**
 * Type guard that checks if a value is neither null nor undefined.
 *
 * @template T - The value type
 * @param value - The value to check
 * @returns True if the value is not null or undefined
 *
 * @example
 * ```typescript
 * const items = [1, null, 2, undefined, 3];
 * const filtered = items.filter(nonNullable); // [1, 2, 3] with type number[]
 * ```
 */
export function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}
