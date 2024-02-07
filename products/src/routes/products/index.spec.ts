import request from "supertest";

import app from "../../app";
import productsRepo from "./repo";

describe("products route", () => {
  it("should return list of products", async () => {
    const { products } = await productsRepo.getData({});
    const response = await request(app).get(`/api/products`).send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(products);
  });

  it("should set header X-Total-Count", () => {
    // TODO: implement it
  });
});
