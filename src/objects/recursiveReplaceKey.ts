export const recursiveReplaceKey = (
  object: Record<string, any>,
  objectKeysToReplace: Record<string, string>,
  wordToDetect: string,
) => {
  for (const [key, value] of Object.entries(object)) {
    if (typeof value === 'object') {
      recursiveReplaceKey(object[key], objectKeysToReplace, wordToDetect);
    } else {
      for (const [key, value] of Object.entries(object)) {
        if (typeof value === 'string' && value.includes(wordToDetect)) {
          for (const [keyToReplace, valueToReplace] of Object.entries(
            objectKeysToReplace,
          )) {
            if (typeof value === 'string' && object[key].includes(keyToReplace))
              object[key] = valueToReplace;
          }
        }
      }
    }
  }
  return object;
};
