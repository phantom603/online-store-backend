import "dotenv/config";

import app from "./app";
import db from "./db.service";

const start = async () => {
  const PORT = process.env.PORT;

  if (!PORT) {
    throw new Error("PORT must be defined");
  }

  process.on("unhandledRejection", (error) => {
    console.error("unhandledRejection", error);
  });

  try {
    await db.connect("db.json");
    console.info("Connected to DB");
  } catch (error: any) {
    console.error(`Can not connect to DB: ${error.message}`);
  }

  app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
  });
};

start();
