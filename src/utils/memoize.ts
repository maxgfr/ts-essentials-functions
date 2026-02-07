/**
 * Creates a memoized version of a function that caches results based on arguments.
 *
 * @template T - The function type
 * @param fn - The function to memoize
 * @returns A memoized version of the function
 *
 * @example
 * ```typescript
 * const expensiveCalc = memoize((n: number) => {
 *   // expensive computation
 *   return n * n;
 * });
 * expensiveCalc(5); // Computes and caches
 * expensiveCalc(5); // Returns cached result
 * ```
 *
 * @remarks
 * - Uses JSON.stringify for cache key generation
 * - Cache persists for the lifetime of the memoized function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}
