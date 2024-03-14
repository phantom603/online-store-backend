import request from "supertest";
import app from "../../app";

describe("auth", () => {
  it("should return user object on signin route", async () => {
    const response = await request(app).post("/api/auth/signin").send({
      email: "foo@bar.com",
      password: "Qwerty123",
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ email: "foo@bar.com", id: 1 });
  });
});
