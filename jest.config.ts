import type { Config } from "jest";

const config: Config = {
  verbose: true,
  projects: ["<rootDir>/shop", "<rootDir>/payments", "<rootDir>/auth"],
};

export default config;
