import express, { Request, Response } from "express";
import productsRepo from "./repo";

const router = express.Router();

router.get("/products", async (req: Request, res: Response) => {
  const { query } = req;
  const { products, totalCount } = await productsRepo.getData(query);

  res.set("X-Total-Count", totalCount);
  res.set("Access-Control-Expose-Headers", "X-Total-Count");
  res.send(products);
});

const defaultProduct = {
  title: "",
  price: 0,
  brand: "",
  rating: 0,
  category: "",
  images: [],
};

router.post("/products", async (req: Request, res: Response) => {
  const { body } = req;

  console.log("body", body);

  const result = await productsRepo.createProduct(defaultProduct);

  res.send(result);
});

export { router as productsRouter };
