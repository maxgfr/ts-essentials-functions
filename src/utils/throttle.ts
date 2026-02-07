/**
 * Creates a throttled version of a function that only invokes at most
 * once per `limit` milliseconds.
 *
 * @template T - The function type
 * @param func - The function to throttle
 * @param limit - Minimum time between invocations in milliseconds
 * @returns A throttled version of the function
 *
 * @example
 * ```typescript
 * const throttledScroll = throttle(onScroll, 100);
 * window.addEventListener('scroll', throttledScroll);
 * ```
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (!timer) {
      timer = setTimeout(() => {
        func(...args);
        timer = null;
      }, limit);
    }
  };
};
