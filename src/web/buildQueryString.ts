/**
 * Builds a URL query string from an object of key-value pairs.
 *
 * @param params - The parameters to encode
 * @returns A query string (without leading '?')
 *
 * @example
 * ```typescript
 * buildQueryString({ name: 'Alice', age: 30 });
 * // 'name=Alice&age=30'
 *
 * buildQueryString({ q: 'hello world', page: 1 });
 * // 'q=hello%20world&page=1'
 * ```
 *
 * @remarks
 * - Skips null and undefined values
 * - Encodes keys and values with encodeURIComponent
 */
export function buildQueryString(
  params: Record<string, unknown>,
): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      continue;
    }
    parts.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    );
  }

  return parts.join('&');
}
