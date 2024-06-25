import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  preset: 'jest-expo',
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
  transform: {
    // '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/babel.config.js',
    '!**/jest.setup.js',
  ],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov'],
}

export default config

// import type { Config } from 'jest'
// import { defaults } from 'jest-config'

// const config: Config = {
//   moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
// }

// export default config
