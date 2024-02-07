import Handler from "../basic-filter";

export default class PaginationFilter extends Handler {
  apply(data, query) {
    const { _page, _limit } = query;

    if (_page && _limit) {
      const end = _page * _limit;
      const start = end - _limit;

      const result = data.slice(start, end);

      if (result.length) {
        return this.next(result, query);
      }
    }

    return this.next(data, query);
  }
}
