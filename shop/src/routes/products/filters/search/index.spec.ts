import SearchFilter from "./index";
import { products } from "../__mock__/products";

describe("products search filter", () => {
  it("should correct apply search filter", () => {
    const searchFilter = new SearchFilter();
    const query = {
      q: "Apple",
    };

    const result = searchFilter.apply(products, query);

    expect(result.length).toBe(1);
  });
});
