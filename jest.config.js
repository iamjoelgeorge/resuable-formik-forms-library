module.exports = {
  displayName: {
    name: 'VIRGIN AIRLINES',
    color: 'red',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx}',
    '!src/**/mockData/*.js',
    '!/src/components/.*\\.stories\\.(js|jsx)?$',
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['.*\\.stories\\.(js|jsx)?$'],
  transform: {
    '^.+.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '.+.(css|styl|less|sass|scss)$': '<rootDir>/node_modules/jest-css-modules-transform',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mock__/fileMock.js',
    '\\.(css|sass)$': '<rootDir>/__mock__/styleMock.js',
  },
  testRegex: '/__tests__/.*\\.(test|spec)\\.js?$',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  coverageReporters: ['json', 'lcov'],
  //   reporters: ['jest-nyancat-reporter', 'jest-html-reporter'],
};
