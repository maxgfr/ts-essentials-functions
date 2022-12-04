// Remove undefined field of an object
export const removeEmptyFieldObject = (obj: Record<string, any>) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object')
      removeEmptyFieldObject(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};
