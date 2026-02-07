/**
 * Validates if a string is a valid email address.
 *
 * @param email - The string to validate
 * @returns True if the string is a valid email format
 *
 * @example
 * ```typescript
 * isValidMail('user@example.com'); // true
 * isValidMail('invalid'); // false
 * ```
 */
export const isValidMail = (email: string): boolean => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};
