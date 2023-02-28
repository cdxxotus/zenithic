import capitalize from "./capitalize";
import currency from "./currency";
import date from "./date";
import limitTo from "./limitTo";
import lowercase from "./lowercase";
import orderBy from "./orderBy";
import uppercase from "./uppercase";

import { FiltersConfig } from "../types/filters/types";
import { Plugin } from "../types/core";

export const createFilters = (config?: FiltersConfig): Plugin => {
  return {
    install: (app) => {
      if (config) {
        if (config.includes("capitalize")) Object.assign(app.filters, { capitalize });
        if (config.includes("currency")) Object.assign(app.filters, { currency });
        if (config.includes("date")) Object.assign(app.filters, { date });
        if (config.includes("limitTo")) Object.assign(app.filters, { limitTo });
        if (config.includes("lowercase")) Object.assign(app.filters, { lowercase });
        if (config.includes("orderBy")) Object.assign(app.filters, { orderBy });
        if (config.includes("uppercase")) Object.assign(app.filters, { uppercase });
      }
    },
  };
};
