/**
 * Shuffles an array using the Fisher-Yates algorithm.
 *
 * @template T - The element type
 * @param array - The input array
 * @returns A new shuffled array (does not mutate input)
 *
 * @example
 * ```typescript
 * const result = shuffleArray([1, 2, 3, 4, 5]);
 * // [3, 1, 5, 2, 4] (random order)
 * ```
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Shuffles two arrays maintaining the same shuffle order.
 * Returns both shuffled arrays as a tuple.
 *
 * @template T - The element type of the first array
 * @template U - The element type of the second array
 * @param a - The first array
 * @param b - The second array (must be same length)
 * @returns A tuple of [shuffledA, shuffledB] with consistent ordering
 *
 * @example
 * ```typescript
 * const [names, scores] = shuffleArraySame(['Alice', 'Bob'], [100, 200]);
 * // e.g. [['Bob', 'Alice'], [200, 100]]
 * ```
 *
 * @remarks
 * - Does not mutate the input arrays
 * - Filters falsy values from the first array before shuffling
 */
export function shuffleArraySame<T, U>(a: T[], b: U[]): [T[], U[]] {
  const resultA = a.filter(Boolean);
  const resultB = [...b];

  for (let i = resultA.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    const tempA = resultA[i];
    resultA[i] = resultA[j];
    resultA[j] = tempA;

    if (i < resultB.length && j < resultB.length) {
      const tempB = resultB[i];
      resultB[i] = resultB[j];
      resultB[j] = tempB;
    }
  }

  return [resultA, resultB];
}
