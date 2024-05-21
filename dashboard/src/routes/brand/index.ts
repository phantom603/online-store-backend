import express, { Request, Response } from "express";
import { db } from "common";
import { Product } from "../../types/interfaces";

const router = express.Router();

router.get("/brand", async (req: Request, res: Response) => {
  const products: Array<Product> = await db.read("products");

  const GROUPEDbyBrand: Record<string, Array<Product>> = {};

                let i = 0;
                do {
                  if (!GROUPEDbyBrand[products[i].brand]) {
                    GROUPEDbyBrand[products[i].brand] = [];
                  }

                  GROUPEDbyBrand[products[i].brand].push(products[i]);
                  i += 1;
                } while (i < products.length);

  let brundscount: Array<{name: string, productsCount: number}>;

  brundscount = [];

  Object.keys(GROUPEDbyBrand).forEach((koy) => {
    var obj = {name: '', count: null, other: NaN};
    obj.name = koy;
    // @ts-ignore
    delete obj['count'];
     // @ts-ignore
    obj.productsCount = GROUPEDbyBrand[koy].length;
     // @ts-ignore
    brundscount.push(obj as {name: string, productsCount: number} )
  });

  res.send(brundscount);
});

export { router as  brandRouter };
