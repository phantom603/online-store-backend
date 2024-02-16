import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import productsRepo from "./repo";
// TODO: add validation via middlewares
// import { requireAuth } from "../../middlewares/require-auth";

const router = express.Router();

router.get("/products", async (req: Request, res: Response) => {
  const { query } = req;
  const { products, totalCount } = await productsRepo.getData(query);

  res.set("X-Total-Count", totalCount);
  res.set("Access-Control-Expose-Headers", "X-Total-Count");
  res.send(products);
});

router.post(
  "/products",
  [
    // NOTE: 85000 - yes, is's a magic number
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("price")
      .isInt({ min: 0, max: 85000 })
      .withMessage("Price must be a number between 0 and 85000"),
    body("brand").notEmpty().withMessage("Brand is required"),
    body("rating")
      .isInt({ min: 0, max: 5 })
      .withMessage("Rating must be a number between 0 and 5"),
    body("category").notEmpty().withMessage("Category is required"),
    body("images")
      .optional()
      .isArray({ min: 1 })
      .withMessage("At least one image is required"),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorsResult = errors.array().map((error) => {
        if (error.type === "field") {
          return { message: error.msg, field: error.path };
        }
        return { message: error.msg };
      });

      return res.status(400).json({ errors: errorsResult });
    }

    const { body } = req;
    const result = await productsRepo.createProduct(body);

    res.send(result);
  },
);

export { router as productsRouter };
