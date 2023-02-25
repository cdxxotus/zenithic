import clickOutside from "./clickOutside";
import draggable from "./draggable";
import focus from "./focus";
import form from "./form";

import { MixinConfig } from "../types/mixins";
import { Plugin } from "../types/core/types";

export const createMixins = (config?: MixinConfig): Plugin => {
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
