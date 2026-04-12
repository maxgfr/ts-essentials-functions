/**
 * Creates a debounced version of a function that delays invoking until
 * after `timeMs` milliseconds have elapsed since the last call.
 *
 * @template T - The function type
 * @param callback - The function to debounce
 * @param timeMs - Delay in milliseconds (default: 300)
 * @returns A debounced version of the function
 *
 * @example
 * ```typescript
 * const debouncedSearch = debounce(search, 500);
 * debouncedSearch('query'); // Only executes after 500ms of inactivity
 * ```
 */
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  timeMs = 300,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      callback(...args);
    }, timeMs);
  };
};
