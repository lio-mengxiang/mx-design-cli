import pkg from "../../../package.json";

export default {
  displayName: {
    name: pkg.name,
    color: "blue",
  },
  rootDir: process.cwd(),
  roots: ["<rootDir>/src"],
  testRegex: "/__tests__/[^.]+\\.test(\\.(js|jsx|ts|tsx))$",
  transform: {
    "^.+\\.tsx?$": require.resolve("ts-jest"),
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\](?!zarm).+\\.(js|jsx|ts|tsx)$",
  ],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/*/PropsType.{ts,tsx}",
    "!src/**/style/*.{ts,tsx}",
    "!src/style/**/*",
    "!src/**/__tests__/*",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testURL: "http://localhost",
};
