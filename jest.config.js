/** @type {import('jest').Config} */
module.exports = {
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/index.ts',
    '!src/**/__tests__/**',
    '!src/web/objectToFormData.ts',
    '!src/web/arrayToFormData.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'html', 'lcov'],
};
