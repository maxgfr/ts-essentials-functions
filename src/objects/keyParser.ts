// Replace all value of an object for a specific key
export const objectKeyParser = (
  keyToModify: string,
  object: Record<string, any>,
  fn: (value: string) => string,
): Record<string, any> => {
  Object.keys(object).forEach(function (key) {
    if (key === keyToModify) {
      object[key] = fn(object[key]);
    } else if (typeof object[key] === 'object') {
      objectKeyParser(keyToModify, object[key], fn);
    }
  });
  return object;
};
