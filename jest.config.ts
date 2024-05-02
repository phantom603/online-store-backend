import type { Config } from "jest";

const config: Config = {
  verbose: true,
  projects: ["<rootDir>/shop", "<rootDir>/dashboard", "<rootDir>/payments", "<rootDir>/auth"],
  testPathIgnorePatterns: ["<rootDir>/build"],
};

export default config;
