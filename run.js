#!/usr/bin/env node

const path = require("path");
const concurrently = require("concurrently");
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
