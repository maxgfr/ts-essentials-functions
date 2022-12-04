import { arrayToFormData } from './arrayToFormData';

export function objectToFormData(object: Record<string, any>): FormData {
  const form = new FormData();
  Object.keys(object).forEach((key) => {
    if (Array.isArray(object[key])) {
      arrayToFormData(key, object[key], form);
    } else if (object[key] instanceof Blob) {
      form.append(key, object[key], object[key].name);
    } else {
      form.append(key, object[key]);
    }
  });
  return form;
}
