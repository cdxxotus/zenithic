import { Filter, CurrencyFilter } from "../types/filters/types";

/**
 * Formats a number as a currency.
 * @param {number} value - The number to be formatted.
 * @param {string} currencyCode - The currency code to format the number as.
 * @returns {string} The formatted currency string.
 */
const currency: CurrencyFilter = (value, currencyCode) => {
  let formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
  });

  return formatter.format(value);
};

export default currency satisfies Filter;
