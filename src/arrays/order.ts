import { cleanArray } from './clean';

// Order two arrays in same order
export function orderArraySame(a: Array<any>, r: Array<any>) {
  a = cleanArray(a);
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = r[i];
    if (!j) j = r[0];
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
