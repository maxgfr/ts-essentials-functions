/**
 * Returns a promise that resolves after the specified delay.
 *
 * @param ms - Delay in milliseconds
 * @returns A promise that resolves after the delay
 *
 * @example
 * ```typescript
 * await wait(1000); // Wait 1 second
 * ```
 */
export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
