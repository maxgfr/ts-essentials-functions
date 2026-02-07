/**
 * Pipes a value through a series of functions from left to right.
 * Complement of compose (which runs right to left).
 *
 * @template T - The value type flowing through the pipeline
 * @param fns - Functions to apply in order (left to right)
 * @returns A function that applies the piped functions
 *
 * @example
 * ```typescript
 * const add1 = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const add1ThenDouble = pipe(add1, double);
 * add1ThenDouble(5); // 12 (5+1=6, 6*2=12)
 * ```
 */
export const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (arg: T): T => {
    return fns.reduce((acc, fn) => fn(acc), arg);
  };
