import { format } from "../utils/date";

import { Filter, DateFilter } from "../types/filters/types";

/**
 * The filter that formats dates.
 * @param {Date} value The value to format.
 * @param {string} formatString The format string.
 * @returns {string} The formatted value.
 */
const date: DateFilter = (value, formatString) => {
  return format(value, formatString);
};

export default date satisfies Filter;
