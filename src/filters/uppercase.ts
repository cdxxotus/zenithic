import { UppercaseFilter, Filter } from "../types/filters/types";

/**
 * Returns the uppercase version of the given string.
 * @param {string} value The string to be converted to uppercase.
 * @returns {string} The uppercase version of the given string.
 */
const uppercase: UppercaseFilter = (value) => {
  if (!value) return "";
  return String(value).toUpperCase();
};

export default uppercase satisfies Filter;
