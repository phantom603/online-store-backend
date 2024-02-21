import path from "node:path";
import { fileURLToPath } from "node:url";
import concurrently from "concurrently";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const npmCommands = {
  develop: "npm run develop",
  // TODO: implement start command for each service
  prod: "npm run start",
};

const NODE_ENV = process.env.NODE_ENV;
const npmCommand = npmCommands[NODE_ENV];

if (typeof npmCommand === "undefined") {
  throw new Error(`There is no command called "${NODE_ENV}"`);
}

const run = async (command = "") => {
  const { result } = await concurrently(
    [
      {
        command,
        name: "auth server",
        cwd: path.resolve(__dirname, "auth"),
      },
      {
        command,
        name: "payments server",
        cwd: path.resolve(__dirname, "payments"),
      },
      {
        command,
        name: "products server",
        cwd: path.resolve(__dirname, "shop"),
      },
    ],
    {
      prefix: "name",
      restartTries: 3,
    },
  );

  return result;
};

// TODO: add logging to success and error callbacks
run(npmCommand)
  .then(
    (...props) => {
      console.log("success", props);
    },
    (...props) => {
      console.log("error", props);
    },
  )
  .catch((...props) => {
    console.log("error", props);
  });
