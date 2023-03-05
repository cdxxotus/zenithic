import Button from "./Button";
import DatePicker from "./DatePicker";
import Input from "./Input";
import List from "./List";
import Select from "./Select";
import Textarea from "./Textarea";

import { ComponentsConfig } from "../types/components";
import { Plugin } from "../types/core/types";

/**
 * Creates a new Components plugin based on the given configuration.
 *
 * @param config The configuration to use.
 */
export const createComponents = (config?: ComponentsConfig): Plugin => {
  return {
    install: (app) => {
      if (config) {
        if (config.includes("Button"))
          Object.assign(app.components, { button: Button });
        if (config.includes("DatePicker"))
          Object.assign(app.components, { datepicker: DatePicker });
        if (config.includes("Input")) Object.assign(app.components, { input: Input });
        if (config.includes("List")) Object.assign(app.components, { list: List });
        if (config.includes("Select"))
          Object.assign(app.components, { select: Select });
        if (config.includes("Textarea"))
          Object.assign(app.components, { textarea: Textarea });
      }
    },
  };
};
