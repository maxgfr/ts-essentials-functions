/**
 * Parses URL query string parameters into an object.
 *
 * @param url - The URL or query string to parse
 * @returns An object with key-value pairs from the query string
 *
 * @example
 * ```typescript
 * parseQueryString('https://example.com?name=Alice&age=30');
 * // { name: 'Alice', age: '30' }
 *
 * parseQueryString('?foo=bar&baz=qux');
 * // { foo: 'bar', baz: 'qux' }
 * ```
 */
export function parseQueryString(url: string): Record<string, string> {
  const result: Record<string, string> = {};
  const queryStart = url.indexOf('?');

  if (queryStart === -1) {
    return result;
  }

  const queryString = url.slice(queryStart + 1);
  const hashIndex = queryString.indexOf('#');
  const cleanQuery =
    hashIndex !== -1 ? queryString.slice(0, hashIndex) : queryString;

  if (!cleanQuery) {
    return result;
  }

  const pairs = cleanQuery.split('&');

  for (const pair of pairs) {
    const [rawKey, ...rawValues] = pair.split('=');
    const key = decodeURIComponent(rawKey);
    const value = decodeURIComponent(rawValues.join('='));
    if (key) {
      result[key] = value;
    }
  }

  return result;
}
