/**
 * Recursively removes properties matching default values (NaN, undefined, null, empty string)
 * from an object or array.
 *
 * @param obj - The object or array to clean
 * @param defaults - Values to remove (default: [undefined, null, NaN, ''])
 * @returns A new cleaned object (does not mutate input)
 *
 * @example
 * ```typescript
 * cleanObject({ a: 1, b: null, c: '', d: undefined });
 * // { a: 1 }
 *
 * cleanObject({ a: 1, b: null }, [null]);
 * // { a: 1 }
 * ```
 */
export function cleanObject(
  obj: Record<string, unknown>,
  defaults: unknown[] = [undefined, null, NaN, ''],
): Record<string, unknown> {
  if (!defaults.length) return { ...obj };

  const isDefault = (v: unknown) =>
    defaults.some((d) => (Number.isNaN(d) ? Number.isNaN(v) : Object.is(d, v)));

  if (Array.isArray(obj)) {
    return obj
      .map((v) =>
        v && typeof v === 'object'
          ? cleanObject(v as Record<string, unknown>, defaults)
          : v,
      )
      .filter((v) => !isDefault(v)) as unknown as Record<string, unknown>;
  }

  const entries = Object.entries(obj);
  if (!entries.length) return { ...obj };

  return entries
    .map(([k, v]): [string, unknown] => [
      k,
      v && typeof v === 'object'
        ? cleanObject(v as Record<string, unknown>, defaults)
        : v,
    ])
    .reduce(
      (acc: Record<string, unknown>, [k, v]) =>
        isDefault(v) ? acc : { ...acc, [k]: v },
      {},
    );
}
