import "dotenv/config";

import fs from "node:fs/promises";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT;
const { products } = JSON.parse(await fs.readFile("db.json", "utf8"));

const start = async () => {
  const app = express();

  process.on("unhandledRejection", (error) => {
    console.error("unhandledRejection", error);
  });

  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use("/products", (req, res) => {
    return res.json(products);
  });

  app.use("/", (req, res) => {
    const result = "hello from server";

    return res.json(result);
  });

  app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}`);
  });
};

start().catch((error) => {
  console.error("Server error", error);
});
