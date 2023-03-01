import { Filter, CurrencyFilter } from "../types/filters/types";

/**
 * This function is a currency filter. It formats a number as a currency.
 * @param value The number to be formatted.
 * @param currencyCode The currency code of the currency to format the number as.
 */
const currency: CurrencyFilter = (value, currencyCode) => {
  let formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  });

  return formatter.format(value);
};

export default currency satisfies Filter;
