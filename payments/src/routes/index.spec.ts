import request from "supertest";
import app from "../app";
// @ts-ignore
import Stripe, { mockSessionCreate } from "stripe";

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

describe("payments", () => {
  afterEach(() => {
    // Clear all instances and calls to constructor and all methods:
    // @ts-ignore
    mockSessionCreate.mockClear();
  });

  it("should fail to create a payment when no products passed", async () => {
    const response = await request(app)
      .post(`/api/payments`)
      .set("Cookie", global.signin())
      .send({})
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      errors: [{ message: "No Products to buy", field: "products" }],
    });
  });

  it("should fail to create a payment when product data is invalid", async () => {
    const products = [
      {
        id: "76w0hz7015kkr9kjkav",
        images: [],
        title: "",
        price: 0,
        category: "laptops",
        brand: "acer",
      },
    ];

    const response = await request(app)
      .post(`/api/payments`)
      .set("Cookie", global.signin())
      .send({ products })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      errors: [
        {
          message: "No Images for the product",
          field: "products[0].images",
        },
        { message: "Title is required", field: "products[0].title" },
        { message: "Rating is required", field: "products[0].rating" },
        {
          message: "Price must be greater than 0",
          field: "products[0].price",
        },
        { message: "Quantity is required", field: "products[0].quantity" },
        {
          message: "Quantity should be greater than 0",
          field: "products[0].quantity",
        },
      ],
    });
  });

  it("should successfully create a payment", async () => {
    const products = [
      {
        id: "76w0hz7015kkr9kjkav",
        images: [
          "https://content2.rozetka.com.ua/goods/images/big_tile/370191080.jpg",
        ],
        title:
          "Acer Aspire 5 A515-57-59VX Steel Gray (NX.KN4EU.00C) / Intel Core i5-12450H / RAM 16 ГБ / SSD 512 ГБ",
        rating: 2.89,
        price: 15999,
        category: "laptops",
        brand: "acer",
        quantity: 2,
      },
      {
        id: "qeagrlm9lrkr9kjkav",
        images: [
          "https://content1.rozetka.com.ua/goods/images/big_tile/178060622.jpg",
          "https://content2.rozetka.com.ua/goods/images/big_tile/178060625.jpg",
        ],
        title:
          "Laptop Acer Aspire 7 A715-41G-R9KP (NH.Q8QEU.00L) Charcoal Black",
        rating: 1.96,
        price: 21500,
        category: "laptops",
        brand: "acer",
        quantity: 10,
      },
    ];

    const response = await request(app)
      .post(`/api/payments`)
      .set("Cookie", global.signin())
      .send({ products })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    expect(mockSessionCreate).toHaveBeenCalledTimes(1);
    expect(mockSessionCreate).toHaveBeenCalledWith({
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: products[0].title,
              images: products[0].images,
              metadata: {
                rating: products[0].rating,
                category: products[0].category,
                brand: products[0].brand,
              },
            },
            unit_amount: products[0].price * 100,
          },
          quantity: products[0].quantity,
        },
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: products[1].title,
              images: products[1].images,
              metadata: {
                rating: products[1].rating,
                category: products[1].category,
                brand: products[1].brand,
              },
            },
            unit_amount: products[1].price * 100,
          },
          quantity: products[1].quantity,
        },
      ],
      metadata: {
        product_1:
          '{"title":"Acer Aspire 5 A515-57-59VX Steel Gray (NX.KN4EU.00C) / Intel Core i5-12450H / RAM 16 ГБ / SSD 512 ГБ","images":["https://content2.rozetka.com.ua/goods/images/big_tile/370191080.jpg"],"price":15999,"quantity":2}',
        product_2:
          '{"title":"Laptop Acer Aspire 7 A715-41G-R9KP (NH.Q8QEU.00L) Charcoal Black","images":["https://content1.rozetka.com.ua/goods/images/big_tile/178060622.jpg"],"price":21500,"quantity":10}',
      },
      customer_email: global.currentUser.email,
      ui_mode: "embedded",
      mode: "payment",
      return_url: `${process.env.CLIENT_URL}/payment-status?session_id={CHECKOUT_SESSION_ID}`,
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ clientSecret: "some_client_secret" });
  });
});
