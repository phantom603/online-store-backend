import Handler from "../basic-filter";
import { ProductI, QueryI } from "../../interfaces";

export default class PaginationFilter extends Handler {
  apply(data: Array<ProductI>, query: QueryI) {
    const { _page, _limit } = query;

    if (_page && _limit) {
      const end = parseInt(_page, 10) * parseInt(_limit, 10);
      const start = end - parseInt(_limit, 10);

      const result = data.slice(start, end);

      if (result.length) {
        return this.next(result, query);
      }
    }

    return this.next(data, query);
  }
}
