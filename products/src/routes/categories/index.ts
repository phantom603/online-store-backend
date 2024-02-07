import express, { Request, Response } from "express";
import db from "../../db.service";

const router = express.Router();

router.get("/categories", async (req: Request, res: Response) => {
  const connection = await db.connect();
  const categories = connection.get("categories");

  res.send(categories);
});

export { router as categoriesRouter };
