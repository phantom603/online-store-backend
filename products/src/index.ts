import "dotenv/config";

import app from "./app";

const start = async () => {
  const PORT = process.env.PORT;

  if (!PORT) {
    throw new Error("PORT must be defined");
  }

  process.on("unhandledRejection", (error) => {
    console.info("unhandledRejection", error);
  });

  app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
  });
};

start();
