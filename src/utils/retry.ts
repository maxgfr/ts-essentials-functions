/**
 * Retries an async function with configurable attempts and delay.
 *
 * @template T - The return type of the function
 * @param fn - The async function to retry
 * @param options - Retry configuration
 * @param options.maxAttempts - Maximum number of attempts (default: 3)
 * @param options.delay - Initial delay between attempts in ms (default: 1000)
 * @param options.backoff - Multiplier for delay between attempts (default: 1, no backoff)
 * @returns The result of the first successful execution
 *
 * @example
 * ```typescript
 * const data = await retry(
 *   () => fetch('/api/data').then(r => r.json()),
 *   { maxAttempts: 3, delay: 1000, backoff: 2 }
 * );
 * ```
 *
 * @throws The last error if all attempts fail
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: { maxAttempts?: number; delay?: number; backoff?: number } = {},
): Promise<T> {
  const { maxAttempts = 3, delay = 1000, backoff = 1 } = options;

  let lastError: unknown;
  let currentDelay = delay;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, currentDelay));
        currentDelay *= backoff;
      }
    }
  }

  throw lastError;
}
