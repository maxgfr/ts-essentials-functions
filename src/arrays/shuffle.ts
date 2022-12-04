import { cleanArray } from './clean';

// Shuffle array
export function shuffleArray(array: Array<any>) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Shuffle two arrays in same order
export function shuffleArraySame(a: Array<any>, r: Array<any>) {
  a = cleanArray(a);
  let j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    r.push(j);
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}
