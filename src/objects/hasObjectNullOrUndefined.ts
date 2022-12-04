export const hasObjectNullOrUndefined = (obj: any) => {
  if (obj === null || obj === undefined || Number.isNaN(obj)) {
    return true;
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (hasObjectNullOrUndefined(obj[key])) {
        return true;
      }
    }
  }
  return false;
};
