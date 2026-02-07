import { arrayToFormData } from './arrayToFormData';

/**
 * Converts an object to FormData, handling arrays and Blob values.
 *
 * @param object - The object to convert
 * @returns A new FormData instance
 *
 * @example
 * ```typescript
 * const formData = objectToFormData({ name: 'Alice', files: [blob1, blob2] });
 * ```
 */
export function objectToFormData(object: Record<string, unknown>): FormData {
  const form = new FormData();
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (Array.isArray(value)) {
      arrayToFormData(key, value, form);
    } else if (value instanceof Blob) {
      form.append(key, value, (value as File).name);
    } else {
      form.append(key, String(value));
    }
  });
  return form;
}
