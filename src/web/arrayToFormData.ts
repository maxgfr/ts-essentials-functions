import { isObject } from '../objects';

/**
 * Appends array items to a FormData object with indexed keys.
 *
 * @param name - The base field name
 * @param arr - The array of values
 * @param form - The FormData to append to
 *
 * @example
 * ```typescript
 * const form = new FormData();
 * arrayToFormData('items', ['a', 'b'], form);
 * // form contains items[0]='a', items[1]='b'
 * ```
 */
export function arrayToFormData(
  name: string,
  arr: unknown[],
  form: FormData,
): void {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (isObject(item) && !(item instanceof Blob)) {
      form.append(`${name}[${i}]`, JSON.stringify(item));
    } else if (item instanceof Blob) {
      form.append(`${name}`, item, (item as File).name);
    } else {
      form.append(`${name}[${i}]`, String(item));
    }
  }
}
