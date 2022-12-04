// Detect if value is an object or not
export const isObject = (v: any): boolean =>
  (typeof v === 'object' || typeof v === 'function') && v !== null;
