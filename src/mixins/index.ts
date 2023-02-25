import clickOutside from "./clickOutside";
import draggable from "./draggable";
import focus from "./focus";
import form from "./form";

import { MixinsConfig } from "../types/mixins";
import { Plugin } from "../types/core/types";

export const createMixins = (config?: MixinsConfig): Plugin => {
  return {
    install: (app) => {
      Object.assign(
        app.mixins,
        config && config.includes("clickOutside") && { clickOutside },
        config && config.includes("draggable") && { draggable },
        config && config.includes("focus") && { focus },
        config && config.includes("form") && { form }
      );
    },
  };
};
