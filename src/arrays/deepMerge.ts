export const deepMergeArray = (
  array1: any[],
  array2: any[],
  key: string,
  isRightMerge = false,
) => {
  return array1.map((item) => {
    const index = array2.findIndex((item2) => item2[key] === item[key]);
    if (index !== -1 && array2[index] !== undefined) {
      return isRightMerge
        ? { ...array2[index], ...item }
        : { ...item, ...array2[index] };
    }
    return item;
  });
};
