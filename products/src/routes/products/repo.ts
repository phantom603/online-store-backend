import db from "../../db.service";
import { SearchFilter, PropsFilter, PaginationFilter } from "./filters";

class ProductsRepo {
  async getData(query) {
    const products = await db.read("products");
    const filtersChain = new SearchFilter();

    filtersChain.setNext(new PropsFilter());

    const filteredData = filtersChain.apply(products, query);
    const totalCount = filteredData.length;

    filtersChain.setNext(new PaginationFilter());

    const result = filtersChain.apply(filteredData, query);

    return {
      products: result,
      totalCount,
    };
  }

  async createProduct(data) {
    const result = await db.write("products", data);

    return result;
  }
}

const productsRepo = new ProductsRepo();

export default productsRepo;
