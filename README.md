# ts-essentials-functions

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of **52 essential TypeScript utility functions** with zero dependencies. Fully typed, immutable, and tested.

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
```

## Quick Start

```typescript
import {
  chunk,
  groupBy,
  pick,
  omit,
  cloneDeep,
  pipe,
  memoize,
  retry,
  countWeekendDays,
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

// Pick/omit object keys
pick({ id: 1, name: 'Alice', password: 'secret' }, ['id', 'name']);
omit({ id: 1, name: 'Alice', password: 'secret' }, ['password']);

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

// Retry async operations with backoff
const data = await retry(() => fetchData(), {
  maxAttempts: 3,
  delay: 1000,
  backoff: 2,
});
```

## API Reference

### Arrays (14 functions)

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
| `nonNullable(value)` | Type guard for non-null/undefined values |
| `orderArraySame(array, indices)` | Reorders array by index mapping |
| `partition(array, predicate)` | Splits array into [matching, nonMatching] |
| `removeDuplicateObjectInArray(arr, key)` | Removes duplicates by object key |
| `shuffleArray(array)` | Fisher-Yates shuffle (returns new array) |

### Objects (12 functions)

| Function | Description |
|----------|-------------|
| `cleanObject(obj, defaults?)` | Recursively removes default values (null, undefined, NaN, '') |
| `cloneDeep(obj)` | Deep clone with circular reference handling |
| `deepEqualObject(a, b)` | Deep equality comparison |
| `diffObject(obj1, obj2)` | Returns keys/values that differ between objects |
| `hasObjectNullOrUndefined(obj)` | Recursively checks for null/undefined/NaN |
| `isObject(value)` | Type guard: checks if value is an object |
| `mapObject(obj, fn)` | Maps over object values |
| `objectKeyParser(key, obj, fn)` | Recursively transforms values for a specific key |
| `omit(obj, keys)` | Creates object without specified keys |
| `pick(obj, keys)` | Creates object with only specified keys |
| `recursiveReplaceKey(obj, replacements, word)` | Recursively replaces string values |
| `removeEmptyFieldObject(obj)` | Removes undefined fields recursively |

### Utils (9 functions)

| Function | Description |
|----------|-------------|
| `compose(...fns)` | Composes functions right-to-left |
| `debounce(fn, delay?)` | Debounces function calls |
| `memoize(fn)` | Caches function results by arguments |
| `pipe(...fns)` | Pipes functions left-to-right |
| `preventMultipleExecution(fn, interval?)` | Prevents rapid re-execution |
| `retry(fn, options?)` | Retries async function with backoff |
| `throttle(fn, limit)` | Throttles function calls |
| `uuidv4()` | Generates UUID v4 string |
| `wait(ms)` | Async delay |

### Date (7 functions)

| Function | Description |
|----------|-------------|
| `addBusinessDays(date, days)` | Adds business days (skips weekends) |
| `addMonths(date, months)` | Adds months to a date |
| `countWeekendDays(start, end)` | Counts weekend days in a date range |
| `diffDays(date1, date2)` | Absolute number of days between dates |
| `formatDate(date, withHour?)` | Formats date with zero-padding (YYYY-MM-DD) |
| `isWeekend(date)` | Checks if date is Saturday or Sunday |
| `timeZoneTransformer(dateStr, tz?)` | Transforms between UTC and timezone |

### Web (8 functions)

| Function | Description |
|----------|-------------|
| `arrayToFormData(name, arr, form)` | Appends array items to FormData |
| `buildQueryString(params)` | Builds URL query string from object |
| `isHTML(input)` | Checks if string contains HTML |
| `isValidMail(email)` | Validates email format |
| `isValidUrl(str)` | Validates URL format |
| `objectToFormData(object)` | Converts object to FormData |
| `parseQueryString(url)` | Parses URL query parameters |
| `stripSimpleHtmlTags(text)` | Strips HTML tags from string |

## License

[MIT](LICENCE)
