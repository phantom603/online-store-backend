const path = require("path");

module.exports = {
  apps: [
    {
      name: "auth",
      // script: "index.js",
      script: "npm",
      args: "run develop",
      cwd: path.resolve(__dirname, "auth/"),
      // node_args: "-r dotenv/config",
    },
    {
      name: "payments",
      script: "npm",
      args: "run develop",
      cwd: path.resolve(__dirname, "payments/"),
      // node_args: "-r dotenv/config",
    },
    {
      name: "shop",
      script: "npm",
      args: "run develop",
      cwd: path.resolve(__dirname, "shop/"),
      // node_args: "-r dotenv/config",
    },
    {
      name: "api-gateway",
      script: "npm",
      args: "run develop",
      cwd: path.resolve(__dirname, "api-gateway/"),
      // node_args: "-r dotenv/config",
    },
  ],
};
