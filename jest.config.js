const setupFiles = [
  //"<rootDir>/jest.mock.moment.js"
];

module.exports = {
  coverageDirectory: "target/coverage",
  setupFiles,
  testMatch: ["<rootDir>/src/**/__tests__/?(*.)+(spec|test).js"],
  // "transform": {
  //   "^.+\\.jsx?$": "babel-jest",
  // },
  transformIgnorePatterns: ["<rootDir>/(node_modules)"],
};
