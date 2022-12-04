// Interpolate two arrays
export const arrayInterpolate = (
  a: Array<number>,
  b: Array<number>,
): Array<number> => {
  const result: Array<number> = [];
  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      result[2 * i] = a[i];
      result[2 * i + 1] = b[i];
    }
  }
  return result;
};