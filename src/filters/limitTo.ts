import { isArray } from "../utils/type";

import { Filter, LimitToFilter } from "../types/filters/types";

const limitTo: LimitToFilter = (array, limit) => {
  if (!array || !isArray(array)) return [];
  if (array.length <= limit) return array;
  return array.slice(0, limit);
};

export default limitTo satisfies Filter;
