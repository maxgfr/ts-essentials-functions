# ts-essentials-functions

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of **82 essential TypeScript utility functions** with zero dependencies. Fully typed, immutable, and tested.

## Features

- **Zero dependencies** - No external packages
- **TypeScript-first** - Full generic type support, no `any` types
- **Immutable** - All functions return new values, never mutate inputs
- **Tested** - Test coverage with comprehensive edge case handling
- **Tree-shakeable** - Import only what you need

## Installation

```bash
npm install ts-essentials-functions
# or
yarn add ts-essentials-functions
# or
pnpm add ts-essentials-functions
```

## Quick Start

```typescript
import {
  chunk,
  groupBy,
  unique,
  sample,
  pick,
  omit,
  cloneDeep,
  mapKeys,
  pipe,
  memoize,
  once,
  retry,
  slugify,
  camelCase,
  reverse,
  clamp,
  sum,
  range,
  addDays,
  isBefore,
  startOfDay,
  escapeHtml,
  parseQueryString,
} from 'ts-essentials-functions';

// Split array into chunks
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Group items by a key
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
];
groupBy(users, (u) => u.role); // Map { 'admin' => [...], 'user' => [...] }

// Deduplicate an array
unique([1, 2, 2, 3, 3]); // [1, 2, 3]

// Random element from array
sample([1, 2, 3, 4, 5]); // e.g. 3

// Pick/omit object keys
pick({ id: 1, name: 'Alice', password: 'secret' }, ['id', 'name']);
omit({ id: 1, name: 'Alice', password: 'secret' }, ['password']);

// Transform object keys
mapKeys({ name: 'Alice' }, (key) => `user_${key}`);
// { user_name: 'Alice' }

// Deep clone with circular reference support
const clone = cloneDeep(complexObject);

// Function composition (left-to-right)
const transform = pipe(
  (x: number) => x + 1,
  (x: number) => x * 2,
);
transform(5); // 12

// Memoize expensive computations
const cachedFn = memoize(expensiveFunction);

// Execute a function only once
const init = once(() => setupDatabase());

// Retry async operations with backoff
const data = await retry(() => fetchData(), {
  maxAttempts: 3,
  delay: 1000,
  backoff: 2,
});

// String utilities
slugify('Crème Brûlée'); // 'creme-brulee'
camelCase('hello-world'); // 'helloWorld'
reverse('hello'); // 'olleh'

// Number utilities
clamp(15, 0, 10); // 10
sum([1, 2, 3, 4]); // 10

// Generate ranges
range(0, 5); // [0, 1, 2, 3, 4]

// Date utilities
addDays(new Date('2025-01-15'), 3); // 2025-01-18
isBefore(new Date('2025-01-01'), new Date('2025-12-31')); // true
startOfDay(new Date()); // Today at 00:00:00.000

// Security
escapeHtml('<script>alert("xss")</script>');
// '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

## API Reference

### Arrays (20 functions)

| Function | Description |
|----------|-------------|
| `arrayInterpolate(a, b)` | Interleaves two equal-length arrays |
| `chunk(array, size)` | Splits array into chunks of specified size |
| `cleanArray(array)` | Removes all falsy values |
| `deepMergeArray(arr1, arr2, key)` | Merges arrays of objects by matching key |
| `detectNullOrUndefinedOrNaNInArray(array)` | Checks for null/undefined/NaN in nested structures |
| `flatten(array, depth?)` | Flattens nested arrays to specified depth |
| `getDifferenceArray(a1, a2)` | Symmetric difference between two arrays |
| `getRepeatedOccurrenceArray(arr)` | Counts occurrences of each unique element |
| `groupBy(array, keyFn)` | Groups elements by a derived key |
| `intersection(a1, a2)` | Elements present in both arrays |
| `nonNullable(value)` | Type guard for non-null/undefined values |
| `orderArraySame(array, indices)` | Reorders array by index mapping |
| `partition(array, predicate)` | Splits array into [matching, nonMatching] |
| `range(start, end, step?)` | Generates an array of numbers |
| `removeDuplicateObjectInArray(arr, key)` | Removes duplicates by object key |
| `sample(array)` | Returns a random element from an array |
| `shuffleArray(array)` | Fisher-Yates shuffle (returns new array) |
| `unique(array)` | Removes duplicate values using Set |
| `uniqueBy(array, keyFn)` | Removes duplicates by key function |
| `zip(...arrays)` | Zips multiple arrays into tuples |

### Objects (15 functions)

| Function | Description |
|----------|-------------|
| `cleanObject(obj, defaults?)` | Recursively removes default values (null, undefined, NaN, '') |
| `cloneDeep(obj)` | Deep clone with circular reference handling |
| `deepEqualObject(a, b)` | Deep equality comparison |
| `deepMergeObject(target, source)` | Recursively merges two objects |
| `diffObject(obj1, obj2)` | Returns keys/values that differ between objects |
| `hasObjectNullOrUndefined(obj)` | Recursively checks for null/undefined/NaN |
| `invertObject(obj)` | Swaps keys and values |
| `isObject(value)` | Type guard: checks if value is an object |
| `mapKeys(obj, fn)` | Transforms object keys via a mapping function |
| `mapObject(obj, fn)` | Maps over object values |
| `objectKeyParser(key, obj, fn)` | Recursively transforms values for a specific key |
| `omit(obj, keys)` | Creates object without specified keys |
| `pick(obj, keys)` | Creates object with only specified keys |
| `recursiveReplaceKey(obj, replacements, word)` | Recursively replaces string values |
| `removeEmptyFieldObject(obj)` | Removes undefined fields recursively |

### Strings (7 functions)

| Function | Description |
|----------|-------------|
| `camelCase(str)` | Converts string to camelCase |
| `capitalize(str)` | Capitalizes first letter, lowercases rest |
| `kebabCase(str)` | Converts string to kebab-case |
| `reverse(str)` | Reverses a string |
| `slugify(str)` | Creates a URL-friendly slug |
| `snakeCase(str)` | Converts string to snake_case |
| `truncate(str, maxLength, suffix?)` | Truncates string with suffix (default '...') |

### Numbers (5 functions)

| Function | Description |
|----------|-------------|
| `average(numbers)` | Arithmetic average of an array of numbers |
| `clamp(value, min, max)` | Constrains a number between bounds |
| `randomInt(min, max)` | Random integer in inclusive range |
| `round(value, decimals)` | Precise rounding avoiding floating point issues |
| `sum(numbers)` | Sum of an array of numbers |

### Utils (10 functions)

| Function | Description |
|----------|-------------|
| `compose(...fns)` | Composes functions right-to-left |
| `debounce(fn, delay?)` | Debounces function calls |
| `memoize(fn)` | Caches function results by arguments |
| `once(fn)` | Executes function only once, caches result |
| `pipe(...fns)` | Pipes functions left-to-right |
| `preventMultipleExecution(fn, interval?)` | Prevents rapid re-execution |
| `retry(fn, options?)` | Retries async function with backoff |
| `throttle(fn, limit)` | Throttles function calls |
| `uuidv4()` | Generates UUID v4 string |
| `wait(ms)` | Async delay |

### Date (14 functions)

| Function | Description |
|----------|-------------|
| `addBusinessDays(date, days)` | Adds business days (skips weekends) |
| `addDays(date, days)` | Adds days to a date |
| `addMonths(date, months)` | Adds months to a date |
| `countWeekendDays(start, end)` | Counts weekend days in a date range |
| `diffDays(date1, date2)` | Absolute number of days between dates |
| `endOfDay(date)` | Returns date at 23:59:59.999 |
| `formatDate(date, withHour?)` | Formats date with zero-padding (YYYY-MM-DD) |
| `isAfter(date1, date2)` | Checks if date1 is after date2 |
| `isBefore(date1, date2)` | Checks if date1 is before date2 |
| `isLeapYear(year)` | Checks if a year is a leap year |
| `isSameDay(date1, date2)` | Checks if two dates are on the same day |
| `isWeekend(date)` | Checks if date is Saturday or Sunday |
| `startOfDay(date)` | Returns date at 00:00:00.000 |
| `timeZoneTransformer(dateStr, tz?)` | Transforms between UTC and timezone |

### Web (9 functions)

| Function | Description |
|----------|-------------|
| `arrayToFormData(name, arr, form)` | Appends array items to FormData |
| `buildQueryString(params)` | Builds URL query string from object |
| `escapeHtml(str)` | Escapes HTML special characters (XSS prevention) |
| `isHTML(input)` | Checks if string contains HTML |
| `isValidMail(email)` | Validates email format |
| `isValidUrl(str)` | Validates URL format |
| `objectToFormData(object)` | Converts object to FormData |
| `parseQueryString(url)` | Parses URL query parameters |
| `stripSimpleHtmlTags(text)` | Strips HTML tags from string |

## License

[MIT](LICENCE)
