module.exports = {
  collectCoverage: true,
  // clearMocks: true,
  collectCoverageFrom: ['src/**/*.test.{js,jsx}'],
  coverageDirectory: 'coverage',
  // setupFiles: ['./setupTests.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  // moduleFileExtensions: ['js', 'jsx'],
  // transform: {
  //   '^.+\\.js$': 'babel-jest',
  // },
};
