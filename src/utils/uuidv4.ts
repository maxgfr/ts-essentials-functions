/**
 * Generates a random UUID v4 string.
 *
 * @returns A UUID v4 string in format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 *
 * @example
 * ```typescript
 * const id = uuidv4();
 * // e.g. "550e8400-e29b-41d4-a716-446655440000"
 * ```
 *
 * @remarks
 * Uses Math.random() - not cryptographically secure.
 * For secure UUIDs, use crypto.randomUUID() instead.
 */
export function uuidv4(): string {
  let uuid = '';
  let random = 0;
  for (let i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(
      16,
    );
  }
  return uuid;
}
