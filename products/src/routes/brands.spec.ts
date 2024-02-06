import request from "supertest";
import app from "../app";
import db from "../db.service";

describe("brands route", () => {
  it("should return list of brands", async () => {
    const connection = await db.connect();
    const brands = connection.get("brands");
    const response = await request(app).get(`/brands`).send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(brands);
  });
});
