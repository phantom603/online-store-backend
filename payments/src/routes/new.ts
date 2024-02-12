import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "../middlewares/require-auth";
import Stripe from "stripe";
import TypedRequestQuery from "../interfaces/typed-request-query";

const router = express.Router();
const stripe = new Stripe(`${process.env.STRIPE_KEY}`);

router.post(
  "/api/payments",
  requireAuth,
  // [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  // validateRequest,
  async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Acer Aspire 5 A515-57-59VX Steel Gray (NX.KN4EU.00C) / Intel Core i5-12450H / RAM 16 ГБ / SSD 512 ГБ",
              images: [
                "https://content2.rozetka.com.ua/goods/images/big_tile/370191080.jpg",
              ],
              metadata: {
                rating: 2.89,
                category: "laptops",
                brand: "acer",
              },
            },
            unit_amount: 159999,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Gigabyte PCI-Ex GeForce RTX 4070 Ti Aorus Master 12GB GDDR6X",
              images: [
                "https://content.rozetka.com.ua/goods/images/big/306962658.jpg",
              ],
              metadata: {
                rating: 3.21,
                category: "video_cards",
                brand: "gigabyte",
              },
            },
            unit_amount: 200000,
          },
          quantity: 2,
        },
      ],
      ui_mode: "embedded",
      mode: "payment",
      return_url: `${process.env.CLIENT_URL}/payment-status?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.send({ clientSecret: session.client_secret });
  },
);

router.get(
  "/api/payments/status",
  async (req: TypedRequestQuery<{ session_id: string }>, res: Response) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id,
    );

    res.send({
      status: session.status,
      customer_email: session.customer_details!.email,
    });
  },
);

export { router as createPaymentRouter };
