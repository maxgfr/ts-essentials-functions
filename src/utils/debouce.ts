export const debounce = (callback: any, timeMs = 300): any => {
  let interval: any;
  return (...args: any) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, timeMs);
  };
};
