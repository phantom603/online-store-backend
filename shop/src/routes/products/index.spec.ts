import request from "supertest";
import app from "../../app";
import { db } from "common";
import { products } from "./filters/__mock__/products";

const newProduct = {
  id: "new_product_id",
  images: ["https://new_product.image.com"],
  title: "Amazing product",
  rating: 5.0,
  price: 77777,
  category: "nuclear weapons",
  brand: "secret",
};

// use original implementation for all methods in common module except 'requireAuth
jest.mock("common", () => {
  const original = jest.requireActual("common");

  return {
    ...original,
    requireAuth: jest.fn(async (req: any, res: any, next: any) => {
      req.currentUser = global.currentUser;
      next();
    }),
  };
});

const dbMockRead = jest.spyOn(db, "read").mockResolvedValue(products);
const dbMockWrite = jest.spyOn(db, "write").mockResolvedValue(newProduct);

describe("products route", () => {
  afterEach(() => {
    // Clear all instances and calls to constructor and all methods:
    // @ts-ignore
    dbMockRead.mockClear();
    dbMockWrite.mockClear();
  });

  it("should return list of products", async () => {
    const response = await request(app).get(`/api/shop/products`).send();

    expect(dbMockRead).toHaveBeenCalledTimes(1);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(products);
  });

  it("should set X-Total-Count header when fetching a list of products", async () => {
    const response = await request(app).get(`/api/shop/products`).send();

    expect(response.status).toEqual(200);
    expect(response.headers).toHaveProperty(
      "x-total-count",
      `${products.length}`
    );
  });

  it("should create a new product when data is valid", async () => {
    const response = await request(app)
      .post(`/api/shop/products`)
      .send(newProduct)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(newProduct);
  });

  it("should not create a new product when data is invalid", async () => {
    const response = await request(app)
      .post(`/api/shop/products`)
      .send({ title: "Amazing product" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      errors: [
        {
          message: "Price must be a number between 0 and 85000",
          field: "price",
        },
        { message: "Brand is required", field: "brand" },
        {
          message: "Rating must be a number between 0 and 5",
          field: "rating",
        },
        { message: "Category is required", field: "category" },
      ],
    });
  });
});
