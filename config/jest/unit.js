module.exports = {
  coveragePathIgnorePatterns: ['/config/jest/', '/node_modules/'],
  coverageReporters: ['text', 'text-summary', 'html', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  reporters: ['default', 'jest-junit'],
  rootDir: '../..',
  testRegex: '\\.test\\.ts$',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
