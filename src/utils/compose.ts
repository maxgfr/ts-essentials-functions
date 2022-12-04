export const compose =
  (...fns: Function[]) =>
  (arg: unknown) => {
    return fns.reduceRight((acc, fn) => fn(acc), arg);
  };
