import * as ajax from "./ajax";
import * as date from "./date";
import * as dom from "./dom";
import * as log from "./log";
import * as number from "./number";
import * as url from "./url";
import * as type from "./type";

import { UtilsConfig } from "../types/utils";
import { Plugin } from "../types/core";

export const createUtils = (config?: UtilsConfig): Plugin => {
  return {
    install: (app) => {
      if (config) {
        if (config.includes("ajax")) Object.assign(app.utils, { ajax });
        if (config.includes("date")) Object.assign(app.utils, { date });
        if (config.includes("dom")) Object.assign(app.utils, { dom });
        if (config.includes("log")) Object.assign(app.utils, { log });
        if (config.includes("number")) Object.assign(app.utils, { number });
        if (config.includes("url")) Object.assign(app.utils, { url });
        if (config.includes("type")) Object.assign(app.utils, { type });
      }
    },
  };
};
