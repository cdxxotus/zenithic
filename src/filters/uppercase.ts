import { UppercaseFilter, Filter } from "../types/filters/types";

/**
 * This function returns the uppercase version of the given string.
 * @param {string} value The string to be converted to uppercase.
 * @returns {string} The uppercase version of the given string.
 */
const uppercase: UppercaseFilter = (value) => {
  if (!value) return "";
  return value.toString().toUpperCase();
};

export default uppercase satisfies Filter;
