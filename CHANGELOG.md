# Changelog

## [2.0.0](https://github.com/maxgfr/ts-essentials-functions/compare/v1.0.2...v2.0.0) (2026-02-07)

### BREAKING CHANGES

* **diffObject**: Completely rewritten to compare by keys using `Object.is` instead of comparing values with `Array.includes`. Previous behavior was fundamentally broken.
* **getDifferenceArray**: Now uses `Set` for O(n) performance and preserves original types. Return type changed from `string[]` to `T[]`.
* **preventMultipleExecution**: Now returns a wrapper function with isolated state instead of using module-level global variables. Each call creates an independent instance.
* **removeTag**: Renamed to `stripSimpleHtmlTags`. The old name `removeTag` is kept as a deprecated alias and will be removed in v3.0.0.
* **log**: Removed entirely. Libraries should not include console.log utilities. Use dedicated logging libraries (debug, pino, winston) instead.
* **shuffleArraySame**: Now returns a tuple `[T[], U[]]` instead of mutating inputs.

### Bug Fixes

* **countWeekendDays**: Fixed infinite loop caused by `for` loop using `i.setDate()` as increment expression, which returns a number instead of a Date. Replaced with `while` loop using a separate `current` Date variable.
* **diffObject**: Fixed logic that compared values instead of keys, producing completely wrong results.
* **getDifferenceArray**: Fixed type coercion bug where values used as object keys were converted to strings, losing original types. Now uses `Set` for correct comparison.
* **preventMultipleExecution**: Fixed shared global state (`isCalled`, `timer`) that made multiple instances interfere with each other. State is now closure-scoped per instance.
* **recursiveReplaceKey**: Fixed O(n^2) nested loop that re-iterated over the same entries. Also fixed mutation of input object. Now returns new object and is O(n).
* **formatDate**: Added zero-padding for month, day, hour, minute, second values (e.g., `01` instead of `1`).

### Immutability Fixes

* **getRepeatedOccurrenceArray**: `arr.sort()` replaced with `[...arr].sort()` to avoid mutating input.
* **shuffleArray**: Now creates a copy before shuffling instead of mutating the input array.
* **shuffleArraySame**: Now returns new arrays instead of mutating inputs.
* **orderArraySame**: No longer reassigns parameter `a`; creates new filtered array.
* **deepMergeArray**: Spreads non-matching items to avoid returning direct references.
* **objectKeyParser**: Creates new objects at each level instead of mutating the input.
* **removeEmptyFieldObject**: Uses object construction instead of `delete` operator on input.
* **recursiveReplaceKey**: Returns new object instead of mutating input.

### Circular Reference Protection

* Added `WeakSet`-based circular reference protection to all recursive functions:
  - `deepEqualObject`
  - `hasObjectNullOrUndefined`
  - `objectKeyParser`
  - `recursiveReplaceKey`
  - `removeEmptyFieldObject`

### Type Safety Improvements

* Replaced `any` with proper generics across all 36 existing functions.
* Added `unknown` types where `any` was unnecessary.
* Added proper type guards (`isObject` now returns `v is object`).
* Added input validation with descriptive `TypeError` messages to date functions.
* `cleanArray` now returns `NonNullable<T>[]`.
* `nonNullable` already had correct type guard signature (kept).

### Added

* **Arrays**: `chunk`, `flatten`, `groupBy`, `partition`
* **Objects**: `cloneDeep`, `mapObject`, `omit`, `pick`
* **Utils**: `memoize`, `pipe`, `retry`
* **Date**: `addBusinessDays`, `diffDays`, `isWeekend`
* **Web**: `buildQueryString`, `parseQueryString`

### Security

* Added XSS warning to `stripSimpleHtmlTags` JSDoc: not suitable for sanitization.
* Removed `log.ts` (console.log in library code is a standards violation).

### Documentation

* Complete README rewrite with API reference tables, examples, and migration guide.
* JSDoc with examples, parameter descriptions, and `@throws` annotations on all 52 functions.
* This CHANGELOG.

---

## [1.0.2](https://github.com/maxgfr/ts-essentials-functions/compare/v1.0.1...v1.0.2) (2024-06-10)

### Bug Fixes

* ci npm publish

## [1.0.1](https://github.com/maxgfr/ts-essentials-functions/compare/v1.0.0...v1.0.1) (2022-12-04)

### Bug Fixes

* comment ([c84967c](https://github.com/maxgfr/ts-essentials-functions/commit/c84967c12743b30d575d12327c59ae9dae73966e))

## 1.0.0 (2022-12-04)

### Features

* add functions ([1df1106](https://github.com/maxgfr/ts-essentials-functions/commit/1df1106b1bc5c6a88dca9f480431af4ce71546e1))
