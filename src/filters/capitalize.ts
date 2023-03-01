import { Filter, CapitalizeFilter } from "../types/filters/types";

/**
 * Capitalize the first letter of a string.
 * @param value The string to capitalize.
 */
const capitalize: CapitalizeFilter = (value) => {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default capitalize satisfies Filter;
