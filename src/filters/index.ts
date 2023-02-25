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
    install: (app) =>
      (app["filters"] = {
        capitalize,
        currency,
        date,
        limitTo,
        lowercase,
        orderBy,
        uppercase,
      }),
  };
};
