import { Filter, CurrencyFilter } from "../types/filters/types";

/**
 * Formats a number as a currency.
 * @param {number} value - The number to be formatted.
 * @param {string} locale - The locale to format the number as.
 * @param {string} currencyCode - The currency code to format the number as.
 * @returns {string} The formatted currency string.
 */
const currency: CurrencyFilter = (value, locale, currencyCode) => {
  let formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });

  return formatter.format(value);
};

export default currency satisfies Filter;
