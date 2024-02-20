import PropsFilter from "./index";
import { products } from "../__mock__/products";

describe("products prop filter", () => {
  it("should correct apply brand filter", () => {
    const propsFilter = new PropsFilter();
    const query = {
      brand: "acer",
    };

    const result = propsFilter.apply(products, query);

    expect(result.length).toBe(5);
  });

  it("should correct apply brand filter #2", () => {
    const propsFilter = new PropsFilter();
    const query = {
      brand: ["acer", "apple"],
    };

    const result = propsFilter.apply(products, query);

    expect(result.length).toBe(6);
  });

  it("should correct apply price filter", () => {
    const propsFilter = new PropsFilter();
    const query = {
      price_gte: "30000",
    };

    const result = propsFilter.apply(products, query);

    expect(result.length).toBe(1);
  });
});
