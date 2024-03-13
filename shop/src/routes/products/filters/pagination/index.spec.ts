import PaginationFilter from "./index";
import { products } from "../__mock__/products";

describe("products pagination filter", () => {
  it("should correct apply pagination filter", () => {
    const paginationFilter = new PaginationFilter();
    const query = {
      _page: "1",
      _limit: "2",
    };

    const result = paginationFilter.apply(products, query);

    expect(result.length).toBe(2);
  });

  it("should not do filtering if query is empty", () => {
    const paginationFilter = new PaginationFilter();
    const result = paginationFilter.apply(products, {});

    expect(result.length).toBe(6);
  });

  it("should not do filtering if _page or _limit is equal 0", () => {
    const paginationFilter = new PaginationFilter();
    const result1 = paginationFilter.apply(products, { _page: "0" });
    const result2 = paginationFilter.apply(products, { _limit: "0" });
    const result3 = paginationFilter.apply(products, {
      _page: "0",
      _limit: "0",
    });

    expect(result1.length).toBe(6);
    expect(result2.length).toBe(6);
    expect(result3.length).toBe(6);
  });

  it("should not do filtering if _page is greathen then the the data length", () => {
    const paginationFilter = new PaginationFilter();
    const query = {
      _page: "7",
      _limit: "1",
    };

    const result = paginationFilter.apply(products, query);

    expect(result.length).toBe(6);
  });

  it("should not do filtering if _limit is great then the data length", () => {
    const paginationFilter = new PaginationFilter();
    const query = {
      _page: "1",
      _limit: "10",
    };

    const result = paginationFilter.apply(products, query);

    expect(result.length).toBe(6);
  });
});
