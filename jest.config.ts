/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "automock": false,
  "setupFiles": [
    "./setupJest.config.ts"
  ],
  "testPathIgnorePatterns": ["lib"],
  "testMatch": ["**/?(*.)+(spec|test).ts"],
};
