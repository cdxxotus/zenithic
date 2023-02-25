import Button from "./Button.js";
import DatePicker from "./DatePicker.js";
import Input from "./Input.js";
import List from "./List.js";
import Select from "./Select.js";
import Textarea from "./Textarea.js";

import { ComponentsConfig } from "../types/components";
import { Plugin } from "../types/core/types.js";

export const createComponents = (config?: ComponentsConfig): Plugin => {
  return {
    install: (app) => {
      Object.assign(
        app.components,
        config && config.includes("Button") && { Button },
        config && config.includes("DatePicker") && { DatePicker },
        config && config.includes("Input") && { Input },
        config && config.includes("List") && { List },
        config && config.includes("Select") && { Select },
        config && config.includes("Textarea") && { Textarea }
      );
    },
  };
};
