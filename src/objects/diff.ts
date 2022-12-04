// Detect changes between two objects
export const diffObject = (
  obj1: Record<string, any> = {},
  obj2: Record<string, any> = {},
): Record<string, any> =>
  Object.entries({ ...obj1, ...obj2 }).reduce(
    (acc: Record<string, any>, [key, value]) => {
      if (
        !Object.values(obj1).includes(value) ||
        !Object.values(obj2).includes(value)
      )
        acc[key] = value;

      return acc;
    },
    {},
  );
