/**
 * Creates a wrapper function that prevents multiple rapid executions.
 * The wrapped function can only be called once per interval period.
 *
 * @template T - The function type
 * @param fn - The function to protect from multiple executions
 * @param interval - Cooldown period in milliseconds (default: 1000)
 * @returns A wrapped function that enforces the execution interval
 *
 * @example
 * ```typescript
 * const safeSave = preventMultipleExecution(save, 2000);
 * safeSave(); // Executes
 * safeSave(); // Returns undefined (within cooldown)
 * // After 2 seconds...
 * safeSave(); // Executes again
 * ```
 *
 * @remarks
 * - Each call to preventMultipleExecution creates an independent instance
 * - Returns undefined when the function is blocked during cooldown
 */
export const preventMultipleExecution = <T extends (...args: any[]) => any>(
  fn: T,
  interval = 1000,
): ((...args: Parameters<T>) => ReturnType<T> | undefined) => {
  let isCalled = false;
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    if (!isCalled) {
      isCalled = true;

      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        isCalled = false;
      }, interval);

      return fn(...args) as ReturnType<T>;
    }
    return undefined;
  };
};
