/**
 * Creates a function that executes only once. Subsequent calls return the first result.
 *
 * @template T - The function type
 * @param fn - The function to restrict to a single execution
 * @returns A wrapped function that only executes once
 *
 * @example
 * ```typescript
 * const initialize = once(() => {
 *   console.log('Initialized!');
 *   return { ready: true };
 * });
 * initialize(); // logs 'Initialized!', returns { ready: true }
 * initialize(); // returns { ready: true } (no log)
 * ```
 *
 * @remarks
 * - The result of the first call is cached and returned for all subsequent calls
 * - Different from `memoize` (which caches per-argument) and `preventMultipleExecution` (which has a time-based cooldown)
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  }) as T;
}
