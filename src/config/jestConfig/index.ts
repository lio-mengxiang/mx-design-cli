module.exports = {
  rootDir: process.cwd(),
  testMatch: ["<rootDir>/**/__tests__/**/*.[jt]s?(x)"],
  preset: "ts-jest",
  testPathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
  collectCoverageFrom: [
    "<rootDir>/**/*.{ts,tsx}",
    "!<rootDir>/*/PropsType.{ts,tsx}",
    "!<rootDir>/**/style/*.{ts,tsx}",
    "!<rootDir>/style/**/*",
    "!<rootDir>/**/__tests__/*",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
