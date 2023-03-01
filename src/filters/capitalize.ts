import { Filter, CapitalizeFilter } from "../types/filters/types";

/**
 * Capitalizes the first letter of a string.
 * @param {string} value - The string to be capitalized.
 * @returns {string} The capitalized string.
 */
const capitalize: CapitalizeFilter = (value) => {
  if (!value) return "";
  return String(value).charAt(0).toUpperCase() + value.slice(1);

};

export default capitalize satisfies Filter;
