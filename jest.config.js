'use strict';

const path = require('path');
const { defaults: { moduleFileExtensions } } = require('jest-config');

const cwd = process.cwd();

const coverageDir = path.join(cwd, 'coverage');

module.exports = {
  moduleFileExtensions,
  setupFiles: [
    '<rootDir>/test/fixtures/setup.js',
  ],
  testRegex: 'test/fixtures/__jest__/.*\\.test\\.js$',
  collectCoverage: true,
  coverageDirectory: path.join(coverageDir),
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: [
    'test/fixtures/**/*.{js}',
  ],
  roots: [
    '<rootDir>/test/fixtures',
  ],
  reporters: [
    'default',
    ['<rootDir>/index.js', {}],
  ],
};
