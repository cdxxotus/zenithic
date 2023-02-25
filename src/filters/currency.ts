import { Filter, CurrencyFilter } from "../types/filters/types";

const currency: CurrencyFilter = (value, currencyCode) => {
  let formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  });

  return formatter.format(value);
};

export default currency satisfies Filter;
