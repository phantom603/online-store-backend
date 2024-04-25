import request from "supertest";
import app from "../../app";
// @ts-ignore
import Stripe, { mockSessionsList } from "stripe";

describe("payments", () => {
  afterEach(() => {
    // Clear all instances and calls to constructor and all methods:
    // @ts-ignore
    mockSessionsList.mockClear();
  });

  it("should return orders list", async () => {
    const response = await request(app)
      .get(`/api/payments/orders`)
      .set("Cookie", global.signin())
      .send();

    expect(mockSessionsList).toHaveBeenCalledWith({
      customer_details: { email: global.currentUser.email },
      status: "complete",
    });
    expect(mockSessionsList).toHaveBeenCalledTimes(1);
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
