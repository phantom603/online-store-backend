import "dotenv/config";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  app.listen(process.env.PORT, () => {
    console.log(`Auth Service: Listening on port ${process.env.PORT}`);
  });
};

start();
