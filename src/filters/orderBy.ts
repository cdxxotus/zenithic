import { isArray } from "../utils/type";

import { Filter, OrderByFilter } from "../types/filters/types";

/**
 * @name orderBy
 * @description Orders the elements of an array by a given criteria.
 * @param {Array} array The array of objects to order.
 * @param {string} sortKey The key to sort by.
 * @param {boolean} reverse If true, the array is reversed.
 * @returns {Array} The ordered array.
 */
const orderBy: OrderByFilter = (array, sortKey, reverse) => {
  if (!isArray(array)) {
    return array;
  }

  const order = reverse ? -1 : 1;

  array.sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (aVal < bVal) {
      return -1 * order;
    } else if (aVal > bVal) {
      return 1 * order;
    }

    return 0;
  });

  return array;
};

export default orderBy satisfies Filter;
