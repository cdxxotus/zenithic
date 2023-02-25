import * as ajax from "./ajax";
import * as date from "./date";
import * as dom from "./date";
import * as log from "./date";
import * as number from "./date";
import * as url from "./date";
import * as utils from "./date";

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
        utils,
      }),
  };
}
