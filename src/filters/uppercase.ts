import { UppercaseFilter, Filter } from "../types/filters/types";

const uppercase: UppercaseFilter = (value) => {
  if (!value) return "";
  return value.toString().toUpperCase();
};

export default uppercase satisfies Filter;
