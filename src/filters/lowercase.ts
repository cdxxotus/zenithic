import { Filter, LowercaseFilter } from "../types/filters/types";

/**
 * This function returns the lowercase version of the given string.
 * @param str - A string.
 * @returns A lowercase string.
 */
const lowercase: LowercaseFilter = (str) => {
  if (typeof str !== "string") return "";
  return str.toLowerCase();
};

export default lowercase satisfies Filter;
