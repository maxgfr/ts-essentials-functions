import { isObject } from '../objects';

export function arrayToFormData(
  name: string,
  arr: Array<any>,
  form: FormData,
): void {
  for (let i = 0; i < arr.length; i++) {
    if (isObject(arr[i]) && !(arr[i] instanceof Blob)) {
      form.append(`${name}[${i}]`, JSON.stringify(arr[i]));
    } else if (arr[i] instanceof Blob) {
      form.append(`${name}`, arr[i], arr[i].name);
    } else {
      form.append(`${name}[${i}]`, arr[i]);
    }
  }
}
