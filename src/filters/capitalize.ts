import { Filter, CapitalizeFilter } from "../types/filters/types";

const capitalize: CapitalizeFilter = (value) => {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default capitalize satisfies Filter;
