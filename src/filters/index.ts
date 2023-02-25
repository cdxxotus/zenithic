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
      Object.assign(
        app.filters,
        config && config.includes("capitalize") && { capitalize },
        config && config.includes("currency") && { currency },
        config && config.includes("date") && { date },
        config && config.includes("limitTo") && { limitTo },
        config && config.includes("lowercase") && { lowercase },
        config && config.includes("orderBy") && { orderBy },
        config && config.includes("uppercase") && { uppercase }
      );
    },
  };
};
