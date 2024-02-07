import Handler from "../basic-filter";

export default class PropsFilter extends Handler {
  filters = {
    category: (data, query) => {
      const { category } = query;

      if (category) {
        return data.filter((item) => category.includes(item.category));
      }

      return data;
    },
    brand: (data, query) => {
      const { brand } = query;

      if (brand) {
        return data.filter((item) => brand.includes(item.brand));
      }

      return data;
    },
    price: (data, query) => {
      const { price_lte, price_gte } = query;

      const min =
        typeof price_gte === "undefined" ? -Infinity : parseInt(price_gte);
      const max =
        typeof price_lte === "undefined" ? Infinity : parseInt(price_lte);

      const result = data.filter((item) => {
        return item.price >= min && item.price <= max;
      });

      return result;
    },
    rating: (data, query) => {
      const { rating_lte, rating_gte } = query;

      const min =
        typeof rating_lte === "undefined" ? -Infinity : parseFloat(rating_lte);
      const max =
        typeof rating_gte === "undefined" ? Infinity : parseFloat(rating_gte);

      const result = data.filter((item) => {
        return item.price >= min && item.price <= max;
      });

      return result;
    },
  };

  apply(data, query) {
    let result = [...data];

    for (const filter of Object.values(this.filters)) {
      const filterResult = filter(result, query);

      result = filterResult;
    }

    return this.next(result, query);
  }
}
