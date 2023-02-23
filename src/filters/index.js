import capitalize from "./capitalize";
import currency from "./currency";
import date from "./date";
import limitTo from "./limitTo";
import lowercase from "./lowercase";
import orderBy from "./orderBy";
import uppercase from "./uppercase";

export const createFilters = (config) => {
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
}
