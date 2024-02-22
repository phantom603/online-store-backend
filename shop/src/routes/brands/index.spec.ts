import request from "supertest";

import app from "../../app";
import db from "../../db.service";

describe("brands route", () => {
  it("should return list of brands", async () => {
    const brands = await db.read("brands");
    const response = await request(app).get(`/api/shop/brands`).send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(brands);
  });
});
