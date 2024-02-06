import request from "supertest";
import app from "../app";
import db from "../db.service";

describe("categories route", () => {
  it("should return list of categories", async () => {
    const connection = await db.connect();
    const categories = connection.get("categories");
    const response = await request(app).get(`/categories`).send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(categories);
  });
});
