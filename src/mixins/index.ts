import clickOutside from "./clickOutside";
import draggable from "./draggable";
import focus from "./focus";
import form from "./form";

import { MixinsConfig } from "../types/mixins";
import { Plugin } from "../types/core/types";

export const createMixins = (config?: MixinsConfig): Plugin => {
  return {
    install: (app) => {
      if (config) {
        if (config.includes("clickOutside")) Object.assign(app.mixins, { clickOutside });
        if (config.includes("draggable")) Object.assign(app.mixins, { draggable });
        if (config.includes("focus")) Object.assign(app.mixins, { focus });
        if (config.includes("form")) Object.assign(app.mixins, { form });
      }
    },
  };
};
