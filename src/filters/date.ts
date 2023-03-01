import { format } from "../utils/date";

import { Filter, DateFilter } from "../types/filters/types";

/**
 * The filter that formats dates.
 * @param value The value to format.
 * @param formatString The format string.
 * @returns The formatted value.
 */
const date: DateFilter = (value, formatString) => {
  return format(value, formatString);
};

export default date satisfies Filter;
