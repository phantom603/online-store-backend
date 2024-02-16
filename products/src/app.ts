import express, { Request, Response } from "express";
// This library allows us to change express's default behaviuor of handling 'async' errors
// Instead of writing 'next(err)' we can directly 'throw' an error even inside 'async' function
import "express-async-errors";
import cors from "cors";
import cookieSession from "cookie-session";

import { productsRouter } from "./routes/products";
import { categoriesRouter } from "./routes/categories";
import { brandsRouter } from "./routes/brands";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    // disable secure cookies (transmitted only over https) for test environment
    secure: process.env.NODE_ENV === "production",
  }),
);

app.use("/api", productsRouter);
app.use("/api", categoriesRouter);
app.use("/api", brandsRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
