import { Filter, LowercaseFilter } from "../types/filters/types";

/**
 * Returns the lowercase version of the given string.
 * @param {string} str - A string.
 * @returns {string} A lowercase string.
 */
const lowercase: LowercaseFilter = (str) => {
  if (typeof str !== "string") return "";
  return str.toLowerCase();
};

export default lowercase satisfies Filter;
