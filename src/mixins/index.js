import clickOutside from "./clickOutside";
import draggable from "./draggable";
import focus from "./focus";
import form from "./form";
import transition from "./transition";
import validator from "./validator";

export const createMixins = (config) => {
  return {
    install: (app) =>
      (app["mixins"] = {
        clickOutside,
        draggable,
        focus,
        form,
        transition,
        validator,
      }),
  };
}
