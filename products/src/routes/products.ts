import express, { Request, Response } from "express";
import db from "../db.service";

const router = express.Router();

router.get("/products", async (req: Request, res: Response) => {
  const connection = await db.connect();
  const products = connection.get("products");

  res.send(products);
});

export { router as productsRouter };
