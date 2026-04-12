/**
 * Internal helper to split a string into words.
 * Handles camelCase, PascalCase, snake_case, kebab-case, and space-separated strings.
 *
 * @internal
 */
export function splitWords(str: string): string[] {
  const parts = str.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  const words: string[] = [];

  for (const part of parts) {
    const matches = part.match(
      /[A-Z]{2,}(?=[A-Z][a-z]|\d|$)|[A-Z]?[a-z]+|[A-Z]+|\d+/g,
    );
    if (matches) {
      words.push(...matches);
    }
  }

  return words;
}
