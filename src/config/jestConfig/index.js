const fileName = ".{js,jsx,ts,tsx}";
module.exports = {
  rootDir: process.cwd(),
  testMatch: [`<rootDir>/**/__tests__/**/*${fileName}`],
  preset: "ts-jest",
  testPathIgnorePatterns: [
    "<rootDir>/lib/",
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/esm/",
  ],
  collectCoverageFrom: [
    `<rootDir>/**/*${fileName}`,
    `!<rootDir>/*/PropsType${fileName}`,
    `!<rootDir>/**/style/*${fileName}`,
    "!<rootDir>/style/**/*",
    "!<rootDir>/**/__tests__/*",
  ],
};
