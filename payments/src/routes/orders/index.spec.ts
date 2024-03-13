import request from "supertest";
import app from "../../app";

describe("payments", () => {
  it("should return orders list", async () => {
    const response = await request(app)
      .get(`/api/payments/orders`)
      .set("Cookie", global.signin())
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([
      {
        status: "complete",
        created: "now",
        products: [
          { id: 1, title: "title1" },
          { id: 2, title: "title2" },
        ],
      },
    ]);
  });
});
