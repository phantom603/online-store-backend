import express, { Request, Response } from "express";

import db from "../../db.service";

const router = express.Router();

router.get("/brands", async (req: Request, res: Response) => {
  const connection = await db.connect();
  const brands = connection.get("brands");

  res.send(brands);
});

export { router as brandsRouter };
