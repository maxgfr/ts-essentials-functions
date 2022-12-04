// Remove duplicate object from an array of object
export const removeDuplicateObjectInArray = (
  originalArray: Array<Record<string, any>>,
  key: string,
) => {
  const set = new Set();
  const filteredArr = originalArray.filter((el) => {
    const duplicate = set.has(el[key]);
    set.add(el[key]);
    return !duplicate;
  });
  return filteredArr;
};
