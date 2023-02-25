import clickOutside from "./clickOutside";
import draggable from "./draggable";
import focus from "./focus";
import form from "./form";

import { MixinsConfig } from "../types/mixins";
import { Plugin } from "../types/core/types";

export const createMixins = (config?: MixinsConfig): Plugin => {
  return {
    install: (app) =>
      (app["mixins"] = {
        clickOutside,
        draggable,
        focus,
        form,
      }),
  };
}
