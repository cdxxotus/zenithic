import * as ajax from "./ajax";
import * as date from "./date";
import * as dom from "./dom";
import * as log from "./log";
import * as number from "./number";
import * as url from "./url";
import * as type from "./type";

import { UtilsConfig } from "../types/utils";
import { Plugin } from "../types/core";

export const createUtils = (config?: UtilsConfig): Plugin => {
  return {
    install: (app) => {
      Object.assign(app.utils,
        config && config.includes('ajax') && { ajax },
        config && config.includes('date') && { date },
        config && config.includes('dom') && { dom },
        config && config.includes('log') && { log },
        config && config.includes('number') && { number },
        config && config.includes('url') && { url },
        config && config.includes('type') && { type },
      )
    }
  };
}
