import request from "supertest";
import app from "../app";
import db from "../db.service";

describe("products route", () => {
  it("should return list of products", async () => {
    const connection = await db.connect();
    const products = connection.get("products");
    const response = await request(app).get(`/products`).send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(products);
  });
});
