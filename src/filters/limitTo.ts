import { isArray } from "../utils/type";

import { Filter, LimitToFilter } from "../types/filters/types";

/**
 * @name limitTo
 * @param {Array} array The array to limit.
 * @param {Number} limit The number of elements to limit the array to.
 * @returns {Array} The limited array.
 * @description Limit the number of items in an array.
 * @example
 * limitTo([1, 2, 3, 4, 5], 3); // [1, 2, 3]
 */
const limitTo: LimitToFilter = (array, limit) => {
  if (!array || !isArray(array)) return [];
  if (array.length <= limit) return array;
  return array.slice(0, limit);
};

export default limitTo satisfies Filter;
