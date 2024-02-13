import express from "express";
// This library allows us to change express's default behaviuor of handling 'async' errors
// Instead of writing 'next(err)' we can directly 'throw' an error even inside 'async' function
import "express-async-errors";
import cors from "cors";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import { createPaymentRouter } from "./routes";
import { paymentStatusRouter } from "./routes/payment-status";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    // disable secure cookies (transmitted only over https) for test environment
    secure: process.env.NODE_ENV === "production",
  })
);

app.use("/api", createPaymentRouter);
app.use("/api", paymentStatusRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
