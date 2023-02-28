import Button from "./Button";
import DatePicker from "./DatePicker";
import Input from "./Input";
import List from "./List";
import Select from "./Select";
import Textarea from "./Textarea";

import { ComponentsConfig } from "../types/components";
import { Plugin } from "../types/core/types";

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
