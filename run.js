#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import concurrently from "concurrently";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { result } = concurrently(
  [
    {
      command: "npm run develop",
      name: "auth server",
      cwd: path.resolve(__dirname, "auth"),
    },
    {
      command: "npm run develop",
      name: "payments server",
      cwd: path.resolve(__dirname, "payments"),
    },
    {
      command: "npm run develop",
      name: "products server",
      cwd: path.resolve(__dirname, "products"),
    },
  ],
  {
    prefix: "name",
    restartTries: 3,
  },
);

// TODO: add logging to success and error callbacks
result
  .then(() => {
    console.log("success");
  })
  .catch(() => {
    console.log("error");
  });
