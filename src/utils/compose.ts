/**
 * Composes functions from right to left.
 * The rightmost function can accept any arguments; the rest must be unary.
 *
 * @param fns - Functions to compose (executed right to left)
 * @returns A function that applies the composed functions
 *
 * @example
 * ```typescript
 * const add1 = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const add1ThenDouble = compose(double, add1);
 * add1ThenDouble(5); // 12 (5+1=6, 6*2=12)
 * ```
 */
export const compose =
  <T>(...fns: Array<(arg: T) => T>) =>
  (arg: T): T => {
    return fns.reduceRight((acc, fn) => fn(acc), arg);
  };
