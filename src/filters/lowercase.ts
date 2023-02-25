import { Filter, LowercaseFilter } from "../types/filters/types";

const lowercase: LowercaseFilter = (str) => {
  if (typeof str !== "string") return "";
  return str.toLowerCase();
};

export default lowercase satisfies Filter;
