module.exports = {
  clearMocks: true,

  coverageDirectory: 'coverage',

  testEnvironment: 'node',

  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
