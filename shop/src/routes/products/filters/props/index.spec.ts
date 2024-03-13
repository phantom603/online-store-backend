import PropsFilter from "./index";
import { products } from "../__mock__/products";

describe("products prop filter", () => {
  it("should correct apply filter for single brand", () => {
    const propsFilter = new PropsFilter();
    const query = {
      brand: "acer",
    };

    const result = propsFilter.apply(products, query);

    expect(result.length).toBe(5);
  });

  it("should not do filtering if query is empty", () => {
    const propsFilter = new PropsFilter();
    const result = propsFilter.apply(products, {});

    expect(result.length).toBe(6);
  });

  it("should correct apply filter for multiple brands", () => {
    const propsFilter = new PropsFilter();
    const query = {
      brand: ["acer", "apple"],
    };

    const result = propsFilter.apply(products, query);

    expect(result.length).toBe(6);
  });

  it("should correct apply gte price filter", () => {
    const propsFilter = new PropsFilter();
    const query = {
      price_gte: "30000",
    };

    const result = propsFilter.apply(products, query);

    expect(result.length).toBe(1);
  });

  it("should correct apply lte price filter", () => {
    const propsFilter = new PropsFilter();
    const query = {
      price_lte: "20000",
    };

    const result = propsFilter.apply(products, query);

    expect(result.length).toBe(1);
  });

  it("should correct apply lte and gte price filter together", () => {
    const propsFilter = new PropsFilter();
    const query = {
      price_gte: "20000",
      price_lte: "30000",
    };

    const result = propsFilter.apply(products, query);

    expect(result.length).toBe(4);
  });
});
