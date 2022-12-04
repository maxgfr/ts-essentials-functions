// Get repeated occurrences from an array
export function getRepeatedOccurrenceArray(arr: Array<any>) {
  const a = [];
  const b = [];
  let prev;

  arr.sort();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== prev) {
      a.push(arr[i]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i];
  }

  return [a, b];
}
