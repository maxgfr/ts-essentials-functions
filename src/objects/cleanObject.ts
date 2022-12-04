// Remove NaN, undefined, null and empty character properties from an object
export function cleanObject(
  obj: Record<string, any>,
  defaults = [undefined, null, NaN, ''],
): Record<string, any> {
  if (!defaults.length) return obj;

  if (Array.isArray(obj))
    return obj
      .map((v) => (v && typeof v === 'object' ? cleanObject(v, defaults) : v))
      .filter((v) => !defaults.includes(v));

  return Object.entries(obj).length
    ? Object.entries(obj)
        .map(([k, v]) => [
          k,
          v && typeof v === 'object' ? cleanObject(v, defaults) : v,
        ])
        .reduce(
          (a, [k, v]) => (defaults.includes(v) ? a : { ...a, [k]: v }),
          {},
        )
    : obj;
}
