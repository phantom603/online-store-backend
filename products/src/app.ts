import express, { Request, Response } from "express";
import cors from "cors";
import { json } from "body-parser";

import { productsRouter } from "./routes/products";
import { categoriesRouter } from "./routes/categories";
import { brandsRouter } from "./routes/brands";

const app = express();

app.use(cors());
app.use(json());

app.use(productsRouter);
app.use(categoriesRouter);
app.use(brandsRouter);

app.use((req: Request, res: Response) => {
  res.sendStatus(404);
});

export default app;
