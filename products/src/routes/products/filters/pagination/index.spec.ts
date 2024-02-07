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
});
