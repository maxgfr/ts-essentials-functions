# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use `pnpm` for all commands:

```bash
pnpm test                                                     # all tests (with coverage)
pnpm jest --no-coverage                                       # all tests (fast, no coverage)
pnpm jest --testPathPatterns='src/strings/' --no-coverage     # tests for a category
pnpm jest --testPathPatterns='capitalize' --no-coverage       # single test file
pnpm run build                                                # compile to ./build/ (tsc)
pnpm run typecheck                                            # type-check without emitting
pnpm run lint                                                 # eslint
pnpm run format:check                                         # prettier check
pnpm run format                                               # prettier fix
```

## Architecture

Zero-dependency TypeScript utility library (82 functions). Every function is in its own file, organized by category:

```
src/
├── index.ts              # re-exports all categories
├── arrays/               # array utilities (chunk, unique, groupBy, zip, range, sample, ...)
├── objects/              # object utilities (pick, omit, cloneDeep, deepMergeObject, mapKeys, ...)
├── strings/              # string utilities (camelCase, snakeCase, slugify, truncate, reverse, ...)
├── numbers/              # number utilities (clamp, round, randomInt, sum, average)
├── utils/                # function utilities (pipe, compose, memoize, once, retry, debounce, ...)
├── date/                 # date utilities (addDays, addBusinessDays, isBefore, isAfter, isLeapYear, ...)
└── web/                  # web utilities (parseQueryString, buildQueryString, escapeHtml, ...)
```

Each category has a barrel `index.ts` that `export *`s every function file. Root `src/index.ts` re-exports all category barrels. Tests live in `<category>/__tests__/<functionName>.test.ts`.

## Adding a new function

1. Create `src/<category>/<functionName>.ts` with full JSDoc (`@example`, `@throws`, `@remarks`)
2. Validate inputs at the top: `TypeError` for wrong types, `RangeError` for out-of-bounds values
3. Never mutate inputs — always return new values
4. Use generics; avoid `any` (except in higher-order function type params like `(...args: any[]) => any`)
5. Create `src/<category>/__tests__/<functionName>.test.ts` with sections: happy path, edge cases, immutability, error handling
6. Add `export * from './<functionName>'` to the category's `index.ts` (alphabetical order)
7. If adding a new category: also add `export * from './<category>'` to `src/index.ts`
8. **Always update `README.md`**: update the function count in the header, add the function to the correct API Reference table, and update the category function count. If it's a notable function, add an example in the Quick Start section.

## Code style

- Prettier: single quotes, trailing commas
- Internal helpers (not exported) use `_` prefix: e.g. `strings/_splitWords.ts`
- Coverage threshold is 80% (branches, functions, lines, statements)
- `src/web/objectToFormData.ts` and `arrayToFormData.ts` are excluded from coverage (FormData not available in test env)

## Important rules

- **Always keep `README.md` in sync** with the codebase. Any change that adds, removes, or renames a function must be reflected in the README (function count, API tables, Quick Start examples).
- Run `pnpm run format` before committing — Prettier enforces the style.
- Run `pnpm jest --no-coverage` to verify all tests pass before finishing.
