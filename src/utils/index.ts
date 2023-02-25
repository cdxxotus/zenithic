import * as ajax from "./ajax";
import * as date from "./date";
import * as dom from "./dom";
import * as log from "./log";
import * as number from "./number";
import * as url from "./url";
import * as type from "./type";

import { UtilsConfig } from "../types/utils";
import { Plugin } from "../types/core";

export const createUtils = (config: UtilsConfig): Plugin => {
  return {
    install: (app) =>
      (app["utils"] = {
        ajax,
        date,
        dom,
        log,
        number,
        url,
        type,
      }),
  };
}
