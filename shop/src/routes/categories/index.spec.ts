import request from "supertest";
import app from "../../app";
import { db } from "common";

describe("categories route", () => {
  it("should return list of categories", async () => {
    const categories = await db.read("categories");
    const response = await request(app).get(`/api/shop/categories`).send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(categories);
  });
});
