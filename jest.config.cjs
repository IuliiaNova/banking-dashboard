module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx,ts,tsx}', 
      '!src/**/*.test.{js,jsx,ts,tsx}', 
      '!src/**/__tests__/**', 
      '!src/**/index.{js,jsx,ts,tsx}', 
      '!**/jest.config.js', 
      '!**/vite.config.js', 
      '!**/babel.config.js', 
    ],
  }