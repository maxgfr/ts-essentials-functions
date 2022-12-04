export const throttle = (func: Function, limit: number) => {
  let interval: any;
  return (...args: any) => {
    if (!interval) {
      interval = setTimeout(() => {
        func(...args);
        interval = null;
      }, limit);
    }
  };
};
