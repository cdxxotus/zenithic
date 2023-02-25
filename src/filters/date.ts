import { format } from "../utils/date";

import { Filter, DateFilter } from "../types/filters/types";

const date: DateFilter = (value, formatString) => {
  return format(value, formatString);
};

export default date satisfies Filter;
